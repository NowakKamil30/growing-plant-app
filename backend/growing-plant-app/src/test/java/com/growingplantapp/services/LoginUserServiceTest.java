package com.growingplantapp.services;

import com.growingplantapp.builders.LoginUserBuilder;
import com.growingplantapp.builders.UserBuilder;
import com.growingplantapp.builders.VerificationTokenBuilder;
import com.growingplantapp.entities.LoginUser;
import com.growingplantapp.entities.User;
import com.growingplantapp.entities.VerificationToken;
import com.growingplantapp.exceptions.LoginUserDontExistException;
import com.growingplantapp.exceptions.VerificationTokenDontExistException;
import com.growingplantapp.exceptions.VerificationTokenIsTooOldException;
import com.growingplantapp.repositories.LoginUserRepository;
import org.hibernate.mapping.Any;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;

@ExtendWith(MockitoExtension.class)
class LoginUserServiceTest {

    @Mock
    LoginUserRepository loginUserRepository;
    @Mock
    VerificationTokenService verificationTokenService;
    @Mock
    PasswordEncoder passwordEncoder;
    @InjectMocks
    LoginUserService loginUserService;

    @Nested
    public class IsExistAccount {
        @Test
        public void isExistAccountExist() {
            final String name = "name";
            given(loginUserRepository.findByUsername(name)).willReturn(LoginUserBuilder.aLoginUser()
                    .withUsername(name)
                    .build());
            assertThrows(IllegalArgumentException.class, () -> {
                loginUserService.isExistAccount(name);
            });
            then(loginUserRepository).should().findByUsername(name);
            then(loginUserRepository).shouldHaveNoMoreInteractions();
        }

        @Test
        public void isExistAccountNotExist() {
            final String name = "name";
            given(loginUserRepository.findByUsername(name)).willReturn(null);
            boolean isExist = loginUserService.isExistAccount(name);
            then(loginUserRepository).should().findByUsername(name);
            then(loginUserRepository).shouldHaveNoMoreInteractions();
            assertThat(isExist).isEqualTo(true);
        }

        @Test
        public void isExistAccountSoftExist() {
            String name = "name";
            given(loginUserRepository.findByUsername(name)).willReturn(LoginUserBuilder.aLoginUser().build());
            boolean isExist = loginUserService.isExistAccountSoft(name);
            then(loginUserRepository).should().findByUsername(name);
            then(loginUserRepository).shouldHaveNoMoreInteractions();
            then(verificationTokenService).shouldHaveNoInteractions();
            assertThat(isExist).isEqualTo(true);
        }

        @Test
        public void isExistAccountSoftNoExist() {
            String name = "name";
            given(loginUserRepository.findByUsername(name)).willReturn(null);
            boolean isExist = loginUserService.isExistAccountSoft(name);
            then(loginUserRepository).should().findByUsername(name);
            then(loginUserRepository).shouldHaveNoMoreInteractions();
            then(verificationTokenService).shouldHaveNoInteractions();
            assertThat(isExist).isEqualTo(false);
        }
    }

    @Nested
    public class ChangePasswordTest {
        @Test
        public void changePasswordWithoutValidToken() throws VerificationTokenIsTooOldException, VerificationTokenDontExistException, LoginUserDontExistException {
            final String token = "214231";
            final String password = "new password";
            given(verificationTokenService.findByToken(token)).willReturn(null);
            assertThrows(VerificationTokenDontExistException.class, () -> loginUserService.changePassword(token, password));
            then(verificationTokenService).should().findByToken(token);
            then(verificationTokenService).shouldHaveNoMoreInteractions();
            then(passwordEncoder).shouldHaveNoMoreInteractions();
            then(loginUserRepository).shouldHaveNoMoreInteractions();
        }
        @Test
        public void changePasswordWithoutLoginUser() throws VerificationTokenIsTooOldException, VerificationTokenDontExistException, LoginUserDontExistException {
            final String token = "214231";
            final String password = "new password";
            LoginUser loginUser = LoginUserBuilder
                    .aLoginUser()
                    .withId(1L)
                    .withPassword("12345")
                    .withUsername("name")
                    .withUser(UserBuilder
                            .anUser()
                            .withFirstName("Test")
                            .withLastName("Test")
                            .build())
                    .build();
            given(verificationTokenService.findByToken(token)).willReturn(VerificationTokenBuilder
                    .aVerificationToken()
                    .withLoginUser(null)
                    .withToken("111111")
                    .withId(1l)
                    .build());
            assertThrows(LoginUserDontExistException.class, () -> loginUserService.changePassword(token, password));
            then(verificationTokenService).should().findByToken(token);
            then(verificationTokenService).shouldHaveNoMoreInteractions();
            then(passwordEncoder).shouldHaveNoMoreInteractions();
            then(loginUserRepository).shouldHaveNoMoreInteractions();
        }

        @Test
        public void changePasswordCorrect() throws VerificationTokenIsTooOldException, VerificationTokenDontExistException, LoginUserDontExistException {
            final String token = "214231";
            final String oldPassword = "q233";
            final String password = "new password";
            final Long id = 1l;
            LoginUser loginUser = LoginUserBuilder
                    .aLoginUser()
                    .withId(1L)
                    .withPassword("12345")
                    .withUsername("name")
                    .withPassword(oldPassword)
                    .withUser(UserBuilder
                            .anUser()
                            .withFirstName("Test")
                            .withLastName("Test")
                            .build())
                    .build();
            given(passwordEncoder.encode(password)).willReturn(password);
            given(verificationTokenService.findByToken(token)).willReturn(VerificationTokenBuilder
                    .aVerificationToken()
                    .withLoginUser(loginUser)
                    .withToken(token)
                    .withId(id)
                    .build());
            loginUserService.changePassword(token, password);
            then(verificationTokenService).should().findByToken(token);
            then(verificationTokenService).should().deleteByToken(token);
            then(verificationTokenService).shouldHaveNoMoreInteractions();
            then(passwordEncoder).should().encode(password);
            then(passwordEncoder).shouldHaveNoMoreInteractions();
            then(loginUserRepository).should().save(loginUser);
            then(loginUserRepository).shouldHaveNoMoreInteractions();
        }

        @Test
        public void changePasswordTokenTooOld() throws VerificationTokenIsTooOldException, VerificationTokenDontExistException, LoginUserDontExistException {
            final String token = "214231";
            final String oldPassword = "q233";
            final String password = "new password";
            final Long id = 1l;
            LoginUser loginUser = LoginUserBuilder
                    .aLoginUser()
                    .withId(1L)
                    .withPassword("12345")
                    .withUsername("name")
                    .withPassword(oldPassword)
                    .withUser(UserBuilder
                            .anUser()
                            .withFirstName("Test")
                            .withLastName("Test")
                            .build())
                    .build();
            VerificationToken verificationToken = VerificationTokenBuilder
                    .aVerificationToken()
                    .withLoginUser(loginUser)
                    .withToken(token)
                    .withId(id)
                    .build();
            verificationToken.setCreateTime(LocalDateTime.of(1970,1,1,1,1));
            given(verificationTokenService.findByToken(token)).willReturn(verificationToken);
            assertThrows(VerificationTokenIsTooOldException.class, () -> loginUserService.changePassword(token, password));
            then(verificationTokenService).should().findByToken(token);
            then(verificationTokenService).should().deleteByToken(token);
            then(verificationTokenService).shouldHaveNoMoreInteractions();
            then(passwordEncoder).shouldHaveNoMoreInteractions();
            then(loginUserRepository).shouldHaveNoMoreInteractions();
        }
    }

    @Nested
    public class VerificationAccount {
        final String token = "dsfdsfsdsadsa";
        final Long id = 1l;

        @Test
        public void verifyAccountWithoutToken() {
            given(verificationTokenService.findByToken(token)).willReturn(null);
            assertThrows(VerificationTokenDontExistException.class, () -> loginUserService.verifyAccount(token));
            then(verificationTokenService).should().findByToken(token);
            then(verificationTokenService).shouldHaveNoMoreInteractions();
            then(passwordEncoder).shouldHaveNoInteractions();
            then(loginUserRepository).shouldHaveNoInteractions();
        }

        @Test
        public void verifyAccountWithoutLoginUser() {
            given(verificationTokenService.findByToken(token)).willReturn(VerificationTokenBuilder
                    .aVerificationToken()
                    .withLoginUser(null)
                    .withToken(token)
                    .build());
            assertThrows(LoginUserDontExistException.class, () -> loginUserService.verifyAccount(token));
            then(verificationTokenService).should().findByToken(token);
            then(verificationTokenService).shouldHaveNoMoreInteractions();
            then(passwordEncoder).shouldHaveNoInteractions();
            then(loginUserRepository).shouldHaveNoInteractions();
        }

        @Test
        public void verifyAccountOldVerificationToken() {
            VerificationToken verificationToken = VerificationTokenBuilder
                    .aVerificationToken()
                    .withLoginUser(LoginUserBuilder.aLoginUser().build())
                    .withToken(token)
                    .withId(id)
                    .build();
            verificationToken.setCreateTime(LocalDateTime.of(1970,1,1,1,1));
            given(verificationTokenService.findByToken(token)).willReturn(verificationToken);
            assertThrows(VerificationTokenIsTooOldException.class, () -> loginUserService.verifyAccount(token));
            then(verificationTokenService).should().findByToken(token);
            then(verificationTokenService).should().deleteByToken(token);
            then(verificationTokenService).shouldHaveNoMoreInteractions();
            then(passwordEncoder).shouldHaveNoInteractions();
            then(loginUserRepository).shouldHaveNoInteractions();
        }


        @Test
        public void verifyAccountWork() throws VerificationTokenIsTooOldException, VerificationTokenDontExistException, LoginUserDontExistException {
            LoginUser user = LoginUserBuilder.aLoginUser().build();
            VerificationToken verificationToken = VerificationTokenBuilder
                    .aVerificationToken()
                    .withLoginUser(user)
                    .withToken(token)
                    .build();
            given(verificationTokenService.findByToken(token)).willReturn(verificationToken);
            loginUserService.verifyAccount(token);
            then(verificationTokenService).should().findByToken(token);
            then(verificationTokenService).should().deleteByToken(token);
            then(verificationTokenService).shouldHaveNoMoreInteractions();
            then(passwordEncoder).shouldHaveNoInteractions();
            then(loginUserRepository).should().save(user);
            then(loginUserRepository).shouldHaveNoMoreInteractions();
        }
    }



}