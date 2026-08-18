package com.example.careergraph.controller;

import com.example.careergraph.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    @PostMapping
    public String createUser(@RequestParam String name) {
        return userService.createUser(name);
    }

    @GetMapping("/{name}")
    public String getUser(@PathVariable String name) {
        return userService.findUserByName(name);
    }

    @PostMapping("/{userName}/skills/{skillName}")
    public String addSkill(
            @PathVariable String userName,
            @PathVariable String skillName
    ) {
        userService.addSkillToUser(userName, skillName);
        return "Skill added successfully";
    }
}