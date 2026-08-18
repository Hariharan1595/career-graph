package com.example.careergraph.service;

import com.example.careergraph.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public String createUser(String name) {
        return userRepository.createUser(name);
    }


    public  String findUserByName(String name){
        return userRepository.findUserByName(name);
    }

    public void addSkillToUser(String userName, String skillName) {
        userRepository.addSkillToUser(userName, skillName);
    }
}
