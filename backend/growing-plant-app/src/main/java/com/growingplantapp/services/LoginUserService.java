package com.growingplantapp.services;

import com.growingplantapp.entities.LoginUser;
import com.growingplantapp.entities.Role;
import com.growingplantapp.entities.VerificationToken;
import com.growingplantapp.exceptions.BadUsernameException;
import com.growingplantapp.exceptions.LoginUserDontExistException;
import com.growingplantapp.exceptions.VerificationTokenDontExistException;
import com.growingplantapp.exceptions.VerificationTokenIsTooOldException;
import com.growingplantapp.repositories.LoginUserRepository;
import com.growingplantapp.services.interfaces.ExtendCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class LoginUserService implements UserDetailsService, ExtendCRUDService<LoginUser, Long> {
    private final LoginUserRepository loginUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final VerificationTokenService verificationTokenService;

    @Autowired
    public LoginUserService(LoginUserRepository loginUserRepository, PasswordEncoder passwordEncoder, VerificationTokenService verificationTokenService) {
        this.loginUserRepository = loginUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.verificationTokenService = verificationTokenService;
    }

    public LoginUser loadUserByUsername(String username) {
        LoginUser loginUser = loginUserRepository.findByUsername(username);
        if (loginUser ==  null) {
            throw new BadUsernameException(username);
        }
        return loginUser;
    }

    public boolean isExistAccount(String username) {
        if (loginUserRepository.findByUsername(username) !=null ) {
            throw new IllegalArgumentException("Podane konto już istnieje");
        }
        return true;
    }

    public boolean isExistAccountSoft(String username) {
        return loginUserRepository.findByUsername(username) != null;
    }

    @Override
    public void patch(Long aLong, Map<String, Object> updates) {
        if (updates.size() > 0) {
            Optional<LoginUser> loginUserOptional = loginUserRepository.findById(aLong);
            loginUserOptional.ifPresent(loginUser -> {
                boolean isEdit = false;
                if (updates.get("username") != null) {
                    loginUser.setUsername((String) updates.get("username"));
                    isEdit = true;
                }
                if (updates.get("password") != null) {
                    loginUser.setPassword((String) updates.get("password"));
                    isEdit = true;
                }
                if (updates.get("isEnable") != null) {
                    loginUser.setEnable(Boolean.getBoolean((String)updates.get("isEnable")));
                    isEdit = true;
                }
                if (updates.get("role") != null) {
                    loginUser.setRole(Role.valueOf((String) updates.get("role")));
                    isEdit = true;
                }
                if (isEdit) {
                    loginUserRepository.save(loginUser);
                }
            });
        }
    }

    @Override
    public Optional<LoginUser> getById(Long aLong) {
        return loginUserRepository.findById(aLong);
    }

    @Override
    public List<LoginUser> getAll() {
        return loginUserRepository.findAll();
    }

    @Override
    public void add(LoginUser loginUser) {
        if (loginUser.getUser() != null) {
            loginUser.getUser().setActiveAccountData(LocalDateTime.now());
        }
        loginUser.setPassword(passwordEncoder.encode(loginUser.getPassword()));
        loginUserRepository.save(loginUser);
    }

    @Override
    public void deleteById(Long aLong) {
        loginUserRepository.deleteById(aLong);
    }

    @Override
    public void update(Long aLong, LoginUser loginUser) {
        loginUser.setId(aLong);
        loginUserRepository.save(loginUser);
    }

    public LoginUser findByUsername(String username) {
        return loginUserRepository.findByUsername(username);
    }

    @Transactional
    public void verifyAccount(String token) throws LoginUserDontExistException,
            VerificationTokenDontExistException,
            VerificationTokenIsTooOldException {
            VerificationToken verificationToken = verificationTokenService.findByToken(token);
        if (verificationToken == null) {
            throw new VerificationTokenDontExistException();
        }

        LoginUser loginUser = verificationToken.getLoginUser();
        if (loginUser == null) {
            throw new LoginUserDontExistException();
        }

        if (verificationToken.getCreateTime().plusHours(1).isBefore(LocalDateTime.now())) {
            throw new VerificationTokenIsTooOldException();
        }
        loginUser.setEnable(true);
        loginUserRepository.save(loginUser);
        verificationTokenService.deleteByToken(token);
    }

    public LoginUser findByEmail(String email) {
        return loginUserRepository.findByUser_Email(email);
    }

    @Transactional
    public void changePassword(String token, String password) throws LoginUserDontExistException,
            VerificationTokenDontExistException,
            VerificationTokenIsTooOldException {
        VerificationToken verificationToken = verificationTokenService.findByToken(token);
        if (verificationToken == null) {
            throw new VerificationTokenDontExistException();
        }
        LoginUser loginUser = verificationToken.getLoginUser();
        if (loginUser == null) {
            throw new LoginUserDontExistException();
        }
        if (verificationToken.getCreateTime().plusHours(1).isBefore(LocalDateTime.now())) {
            throw new VerificationTokenIsTooOldException();
        }
        loginUser.setPassword(passwordEncoder.encode(password));
        loginUserRepository.save(loginUser);
        verificationTokenService.deleteByToken(token);
    }
}
