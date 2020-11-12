package com.growingplantapp.aspects;

import com.growingplantapp.entities.LoginUser;
import com.growingplantapp.entities.VerificationToken;
import com.growingplantapp.exceptions.EmailSendException;
import com.growingplantapp.services.EmailService;
import com.growingplantapp.services.LoginUserService;
import com.growingplantapp.services.VerificationTokenService;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.xml.transform.Result;

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
        System.out.println(result);
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
                        .findBuToken(verificationToken.getToken()).getId());
                throw new EmailSendException("problem with sending email");
            }
        }
    }
}
