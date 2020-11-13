package com.growingplantapp.aspects;

import com.growingplantapp.entities.LoginUser;
import com.growingplantapp.entities.VerificationToken;
import com.growingplantapp.exceptions.EmailSendException;
import com.growingplantapp.services.EmailService;
import com.growingplantapp.services.LoginUserService;
import com.growingplantapp.services.VerificationTokenService;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import java.util.Map;
import java.util.Objects;

@Aspect
@Component
public class EmailAspect {

    private final EmailService emailService;
    private final VerificationTokenService verificationTokenService;
    private final LoginUserService loginUserService;

    @Autowired
    public EmailAspect(EmailService emailService, VerificationTokenService verificationTokenService, LoginUserService loginUserService) {
        this.emailService = emailService;
        this.verificationTokenService = verificationTokenService;
        this.loginUserService = loginUserService;
    }


    @AfterReturning(pointcut = "@annotation(SendActivityAccountEmail)", returning = "result")
    public void sendActivityAccountEmail(JoinPoint joinPoint, ResponseEntity<Void> result) {
        if (joinPoint.getArgs()[0] instanceof LoginUser && result.getStatusCode() == HttpStatus.OK) {
            LoginUser loginUser = (LoginUser) joinPoint.getArgs()[0];
            VerificationToken verificationToken = verificationTokenService.generateVerificationToken(loginUser);
            verificationTokenService.add(verificationToken);
            try {
                emailService.sendMail(
                        loginUser.getUser().getEmail(),
                        "Verification token",
                        "http://localhost:3000/verification-account?token=" + verificationToken.getToken());
            } catch (MessagingException e) {
                loginUserService.deleteById(loginUser.getId());
                verificationTokenService.deleteById(verificationTokenService
                        .findByToken(verificationToken.getToken()).getId());
                throw new EmailSendException("problem with sending email");
            }
        }
    }

    @AfterReturning(pointcut = "@annotation(SendResetPasswordEmail)", returning = "result")
    public void sendResetPasswordEmail(JoinPoint joinPoint, ResponseEntity<Map<String,Boolean>> result) {
        if (joinPoint.getArgs()[0] instanceof Map && Objects.requireNonNull(result.getBody()).get("isSendEmail")) {
            Map<String, String> args = (Map) joinPoint.getArgs()[0];
            String email = args.get("email");
            LoginUser loginUser = loginUserService.findByEmail(email);
            verificationTokenService.deleteByLoginUserId(loginUser.getId());
            VerificationToken verificationToken = verificationTokenService.generateVerificationToken(loginUser);
            verificationTokenService.add(verificationToken);
            try {
                emailService.sendMail(
                        loginUser.getUser().getEmail(),
                        "change password",
                        "http://localhost:3000/change-password?token=" + verificationToken.getToken());
            } catch (MessagingException e) {
                verificationTokenService.deleteByLoginUserId(loginUser.getId());
                throw new EmailSendException("problem with sending email");
            }
        }
    }
}
