package com.growingplantapp.services;

import com.growingplantapp.entities.LoginUser;
import com.growingplantapp.entities.Role;
import com.growingplantapp.exceptions.BadUsernameException;
import com.growingplantapp.repositories.LoginUserRepository;
import com.growingplantapp.services.interfaces.ExtendCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class LoginUserService implements UserDetailsService, ExtendCRUDService<LoginUser, Long> {
    private final LoginUserRepository loginUserRepository;

    @Autowired
    public LoginUserService(LoginUserRepository loginUserRepository) {
        this.loginUserRepository = loginUserRepository;
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
        if (loginUserRepository.findByUsername(username) !=null ) {
          return false;
        }
        return true;
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
}
