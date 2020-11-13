package com.growingplantapp.repositories;

import com.growingplantapp.entities.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    VerificationToken findByToken(String token);
    VerificationToken findByLoginUser_Id(Long id);
    void deleteByToken(String token);
}