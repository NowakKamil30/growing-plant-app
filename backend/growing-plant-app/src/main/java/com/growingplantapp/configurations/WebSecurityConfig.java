package com.growingplantapp.configurations;

import com.growingplantapp.entities.Role;
import com.growingplantapp.filters.JwtFilter;
import com.growingplantapp.services.LoginUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final LoginUserService loginUserService;

    @Autowired
    public WebSecurityConfig(LoginUserService loginUserService) {
        this.loginUserService = loginUserService;
    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(loginUserService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/api/v1/auth/**").permitAll()
                .and()
                .addFilterBefore(new JwtFilter(), UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/api/v1/user/**").hasAnyRole(
                        Role.ADMIN.toString(),
                        Role.USER.toString())
                .antMatchers(HttpMethod.GET, "/api/v1/weather/device/**").hasAnyRole(
                        Role.ADMIN.toString(),
                        Role.USER.toString());
        http.csrf().disable();
    }
}
