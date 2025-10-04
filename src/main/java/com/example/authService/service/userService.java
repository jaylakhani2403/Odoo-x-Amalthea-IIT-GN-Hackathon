package com.example.authService.service;

import com.example.authService.entity.user;
import com.example.authService.repo.userRepo;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Service
public class userService {

    SecretKey key = Keys.hmacShaKeyFor("TaK+HaV^uvCHEFsEVfypW#7g9^k*Z8$V".getBytes(StandardCharsets.UTF_8));

    @Autowired
    userRepo userRepo;

 public ResponseEntity<?> sigup(user u){
     System.out.println(u.getUsername());
     System.out.println(u.getEmail());


        userRepo.save(u);

        return new ResponseEntity<>("signup successfully", HttpStatus.OK);

    }

//    public String login(user user){
//
//        String username= user.getUsername();
//        String password= user.getPassword();
//
//        user userFromDb=userRepo.findById(username).get();
//        if(!userFromDb.getPassword().equals(password)){
//            throw new RuntimeException("wrong Password");
//        }
//
//        if(userFromDb==null){
//            throw new RuntimeException("Invalid credentials");
//        }else{
//            return generateToken(userFromDb);
//        }
//    }


    public Map<String,String> login(String username, String password){

        HashMap<String ,String> response=new HashMap<>();


        user userFromDb=userRepo.findById(username).get();
        if(!userFromDb.getPassword().equals(password)){
            throw new RuntimeException("wrong Password");
        }

        if(userFromDb==null){
            throw new RuntimeException("Invalid credentials");
        }else{



            String Token=generateToken(userFromDb);
            String userName=username;
            String role=userFromDb.getRole();


            response.put("token",Token);
            response.put("usename",userName);
            response.put("role",role);
            response.put("email",userFromDb.getEmail());


            return response;
        }
    }

//    private String generateToken(user user) {
//        return Jwts.builder()
//                .setSubject(user.getUsername())
//                .claim("role", user.getRole())
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
//                .signWith(SignatureAlgorithm.HS256, key)
//                .compact();
//    }

    private String generateToken(user user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("role",user.getRole())
                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 5))
                .signWith(key, SignatureAlgorithm.HS256) // ✅ correct order
                .compact();
    }


}
