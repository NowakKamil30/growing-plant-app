package com.growingplantapp.services;

import com.growingplantapp.entities.Role;
import com.growingplantapp.entities.User;
import com.growingplantapp.repositories.UserRepository;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    UserRepository userRepository;

    @InjectMocks
    UserService userService;

    static User user;

    @BeforeAll()
    static void init() {
//        user = UserBuilder.anUser()
//                .withName("name")
//                .withEmail("email")
//                .withId(1L)
//                .withIsActive(false)
//                .withRole(Role.USER)
//                .build();
    }

    @Test()
    void getAllNotEmptyList() {
        List<User> userList = List.of(user);

        given(userRepository.findAll()).willReturn(userList);

        List<User> userListToTest = userService.getAll();
        then(userRepository).should().findAll();
        then(userRepository).shouldHaveNoMoreInteractions();
        assertThat(userListToTest).isNotNull();
        assertThat(userListToTest.size()).isEqualTo(1);
    }

    @Test()
    void getAllEmptyList() {
        List<User> userList = List.of();

        given(userRepository.findAll()).willReturn(userList);

        List<User> userListToTest = userService.getAll();
        then(userRepository).should().findAll();
        then(userRepository).shouldHaveNoMoreInteractions();
        assertThat(userListToTest).isNotNull();
        assertThat(userListToTest.size()).isEqualTo(0);
    }

    @Test()
    void getByIdFound() {
        final Long id = 1L;
        given(userRepository.findById(id)).willReturn(Optional.of(user));

        Optional<User> userListToTest = userService.getById(id);
        then(userRepository).should().findById(id);
        then(userRepository).shouldHaveNoMoreInteractions();
        assertThat(userListToTest).isNotNull();
        assertThat(userListToTest.get().getId()).isEqualTo(1L);
    }

    @Test()
    void getByIdNotFound() {
        given(userRepository.findById(Mockito.anyLong())).willReturn(Optional.empty());

        Optional<User> userListToTest = userService.getById(Mockito.anyLong());
        then(userRepository).should().findById(Mockito.anyLong());
        then(userRepository).shouldHaveNoMoreInteractions();
        assertThat(userListToTest).isEmpty();
    }

    @Test
    void add() {
        given(userRepository.save(user)).willReturn(user);

        userService.add(user);
        then(userRepository).should().save(user);
        then(userRepository).shouldHaveNoMoreInteractions();
    }

    @Test
    void deleteById() {
        final Long id = 1L;
        userService.deleteById(id);
        then(userRepository).should().deleteById(id);
        then(userRepository).shouldHaveNoMoreInteractions();
    }

    @Test
    void update() {
//        User newUser = UserBuilder.anUser()
//                .withEmail("UpdateEmail")
//                .withIsActive(true)
//                .withName("updateName")
//                .withRole(Role.USER)
//                .build();
//        given(userRepository.save(newUser)).willReturn(newUser);
//        userService.update(1L, newUser);
//
//        then(userRepository).should().save(newUser);
//        then(userRepository).shouldHaveNoMoreInteractions();
    }

    @Test
    void patchNotChange() {
        final Long id = 1L;
        Map<String, Object> fields = new HashMap<>();
        userService.patch(id, fields);
        then(userRepository).shouldHaveNoInteractions();

        assertThat(fields.size()).isEqualTo(0);
    }
    @Test
    void patchWithWrongKey() {
        final Long id = 1L;
        Map<String, Object> fields = new HashMap<>();
        fields.put("wrong", "wrong");
        given(userRepository.findById(id)).willReturn(Optional.of(user));

        userService.patch(id, fields);
        then(userRepository).should().findById(id);
        then(userRepository).shouldHaveNoMoreInteractions();
    }

    static Stream<Arguments> getArgsToPatchChange() {
        return Stream.of(Arguments.of("name", "kkakaka"),
                Arguments.of("email", "kkkk@22dsd.pl"),
                Arguments.of("role", Role.ADMIN),
                Arguments.of("isActive", true));
    }

    @ParameterizedTest(name = "{displayName} - [{index}] {arguments}")
    @MethodSource("getArgsToPatchChange")
    void patchChangeUser(String key, Object value) {
        final Long id = 1L;
        Map<String, Object> fields = new HashMap<>();
        fields.put(key,value);
        given(userRepository.findById(id)).willReturn(Optional.of(user));

        userService.patch(id,fields);

        then(userRepository).should().findById(id);
        then(userRepository).should().save(any(User.class));
        then(userRepository).shouldHaveNoMoreInteractions();
    }
}