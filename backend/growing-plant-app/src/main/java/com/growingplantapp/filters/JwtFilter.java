package com.growingplantapp.filters;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.growingplantapp.exceptions.BadJwtException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

public class JwtFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {

        String authorization = httpServletRequest.getHeader("Authorization");

        if (authorization != null) {
            UsernamePasswordAuthenticationToken authenticationToken = getAuthenticationToken(authorization);
            if (authenticationToken != null) {
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            } else {
                httpServletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "The token is no valid");
                return;
            }
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    private UsernamePasswordAuthenticationToken getAuthenticationToken(String authorization) {
        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC512("McQfTjWnZr4u7x!A%D*G-KaNdRgUkXp2s5v8y/B?E(H+MbQeShVmYq3t6w9z$C&F")).build();
        DecodedJWT verify;
        try {
            verify = jwtVerifier.verify(authorization.substring(7));
        } catch (Exception e) {
            return null;
        }
        String name = verify.getClaim("name").asString();
        String role = verify.getClaim("role").asString();
        SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority(role);
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(name, null, Collections.singleton(simpleGrantedAuthority));
        return token;
    }
}
