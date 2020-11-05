package com.growingplantapp.services;

import com.growingplantapp.entities.LoginUser;
import com.growingplantapp.repositories.LoginUserRepository;
import com.growingplantapp.services.interfaces.ExtendCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

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
            throw new RuntimeException(username);
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

    }

    @Override
    public Optional<LoginUser> getById(Long aLong) {
        return Optional.empty();
    }

    @Override
    public List<LoginUser> getAll() {
        return null;
    }

    @Override
    public void add(LoginUser loginUser) {
        loginUserRepository.save(loginUser);
    }

    @Override
    public void deleteById(Long aLong) {

    }

    @Override
    public void update(Long aLong, LoginUser loginUser) {

    }
}
