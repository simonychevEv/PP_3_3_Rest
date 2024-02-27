package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

@Controller
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @GetMapping("/admin")
    public String userTable(Model model, Authentication authentication) {
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("user", userService.findByUsername(authentication.getName()));
        model.addAttribute("listRoles", roleService.getListRoles());
        return "admin";
    }

    @GetMapping("/admin/new-user")
    public String newUserPage(@ModelAttribute("newUser") User user, Model model, Authentication authentication) {
        model.addAttribute("user", userService.findByUsername(authentication.getName()));
        model.addAttribute("listRoles", roleService.getListRoles());
        return "add-new-user";
    }

    @PostMapping("/admin/add-user")
    public String addUser(@ModelAttribute("user") User user) {
        userService.addUser(user);
        return "redirect:/admin";
    }

    @PostMapping("/admin/update_user")
    public String getUpdateUser(@RequestParam("userId") int id, User user) {
        user.setId(id);
        userService.addUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/admin/delete_user")
    public String delete(@RequestParam("userId") int id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }
}
