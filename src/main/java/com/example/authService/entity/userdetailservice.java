package com.example.authService.entity;

import com.example.authService.repo.userRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class userdetailservice  implements UserDetailsService {

    @Autowired
    userRepo userrepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        if (username.equals("manager")) {
            return User.withUsername("manager")
                    .password("1234") // no password
                    .roles("user")
                    .build();
        }

        if (username.length() == 0) {
            return new loaduserreturnformate(null);
        }

        user u = userrepo.findById(username).get();

        if (u == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        } else {
            return new loaduserreturnformate(u);
        }
    }
}
