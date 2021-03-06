package com.growingplantapp.services;

import com.growingplantapp.builders.VerificationTokenBuilder;
import com.growingplantapp.entities.LoginUser;
import com.growingplantapp.entities.VerificationToken;
import com.growingplantapp.repositories.VerificationTokenRepository;
import com.growingplantapp.services.interfaces.CRUDService;
import com.growingplantapp.services.interfaces.ExtendCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class VerificationTokenService implements CRUDService<VerificationToken, Long> {

    private final VerificationTokenRepository verificationTokenRepository;

    public VerificationToken generateVerificationToken(LoginUser loginUser) {
        String token = "";
        do  {
            token = UUID.randomUUID().toString() + loginUser.getId();
        } while (verificationTokenRepository.findByToken(token) != null);
        return VerificationTokenBuilder.aVerificationToken()
                .withLoginUser(loginUser)
                .withToken(token)
                .build();
    }

    @Autowired
    public VerificationTokenService(VerificationTokenRepository verificationTokenRepository) {
        this.verificationTokenRepository = verificationTokenRepository;
    }


    @Override
    public Optional<VerificationToken> getById(Long aLong) {
        return verificationTokenRepository.findById(aLong);
    }

    @Override
    public List<VerificationToken> getAll() {
        return verificationTokenRepository.findAll();
    }

    @Override
    public void add(VerificationToken verificationToken) {
        verificationTokenRepository.save(verificationToken);
    }

    @Override
    public void deleteById(Long aLong) {
        verificationTokenRepository.deleteById(aLong);

    }

    @Override
    public void update(Long aLong, VerificationToken verificationToken) {
        verificationToken.setId(aLong);
        verificationTokenRepository.save(verificationToken);
    }

    public VerificationToken findByToken(String token) {
        return verificationTokenRepository.findByToken(token);
    }

    public VerificationToken findByLoginUserId(Long id) {
        return verificationTokenRepository.findByLoginUser_Id(id);
    }


    public void deleteByToken(String token) {
        verificationTokenRepository.deleteByToken(token);
    }

    @Transactional
    public void deleteByLoginUserId(Long id) {
        verificationTokenRepository.deleteByLoginUser_Id(id);
    }

    public void deleteAllByCreateTimeBefore(LocalDateTime localDateTime) {
        verificationTokenRepository.deleteAllByCreateTimeBefore(localDateTime);
    }
}
