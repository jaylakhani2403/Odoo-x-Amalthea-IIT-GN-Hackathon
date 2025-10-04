package com.example.authService.controlle;

import com.example.authService.entity.user;
import com.example.authService.repo.userRepo;
import com.example.authService.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*") // for dev only
public class userController {

    @Autowired
    userService userService;

    @Autowired
    userRepo userRepo;

    @PostMapping("signUp")
    ResponseEntity<?> signUp(@RequestBody user u){
        if(userRepo.findById(u.getUsername()).isPresent()){
            return new ResponseEntity<>("user AllReady Exist", HttpStatus.NOT_ACCEPTABLE);
        }
        return userService.sigup(u);
    }


    @PostMapping("login")
    Map<String, String> login(@RequestParam String userName, @RequestParam String  password){

        return userService.login(userName,password);

    }
}
