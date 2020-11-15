package com.growingplantapp.configurations;

import com.growingplantapp.services.VerificationTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDateTime;

@EnableScheduling
@Configuration
public class ScheduleConfig {
    private final VerificationTokenService verificationTokenService;

    @Autowired
    public ScheduleConfig(VerificationTokenService verificationTokenService) {
        this.verificationTokenService = verificationTokenService;
    }

    @Scheduled(cron = "0 0 4 * * *")
    public void deleteTooOldVerificationToken() {
        verificationTokenService.deleteAllByCreateTimeBefore(LocalDateTime.now().plusHours(1));
    }
}
