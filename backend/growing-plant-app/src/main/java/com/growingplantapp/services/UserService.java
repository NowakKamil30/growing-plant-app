package com.growingplantapp.services;

import com.growingplantapp.entities.Role;
import com.growingplantapp.entities.User;
import com.growingplantapp.repositories.UserRepository;
import com.growingplantapp.services.interfaces.ExtendCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService implements ExtendCRUDService<User, Long> {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void patch(Long aLong, Map<String, Object> updates) {
        if (updates.size() > 0) {
            Optional<User> optionalUser = userRepository.findById(aLong);
            optionalUser.ifPresent(user -> {
                boolean isEdit = false;
                if (updates.get("email") != null) {
                    user.setEmail((String) updates.get("email"));
                    isEdit = true;
                }
                if (updates.get("name") != null) {
                    user.setName((String) updates.get("name"));
                    isEdit = true;
                }
                if (updates.get("role") != null) {
                    user.setRole((Role) updates.get("role"));
                    isEdit = true;
                }
                if (updates.get("isActive") != null) {
                    user.setActive((boolean) updates.get("isActive"));
                    isEdit = true;
                }
                if (isEdit) {
                    userRepository.save(user);
                }
            });
        }
    }

    @Override
    public Optional<User> getById(Long aLong) {
        return userRepository.findById(aLong);
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public void add(User user) {
        userRepository.save(user);
    }

    @Override
    public void deleteById(Long aLong) {
        userRepository.deleteById(aLong);
    }

    @Override
    public void update(Long aLong, User user) {
        user.setId(aLong);
        userRepository.save(user);
    }
}
