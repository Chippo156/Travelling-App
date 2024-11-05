package org.ecommerce.travelappbackend.controller;

import com.nimbusds.jose.JOSEException;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.ecommerce.travelappbackend.dtos.request.AuthenticationRequest;
import org.ecommerce.travelappbackend.dtos.request.IntrospectRequest;
import org.ecommerce.travelappbackend.dtos.response.ApiResponse;
import org.ecommerce.travelappbackend.dtos.response.AuthenticationResponse;
import org.ecommerce.travelappbackend.dtos.response.IntrospectResponse;
import org.ecommerce.travelappbackend.services.impl.AuthenticationService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequiredArgsConstructor

@RequestMapping("${api.prefix}/auth")
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class AuthenticationController {
    AuthenticationService authenticationService;

    @PostMapping("/token")
    public ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest authenticationRequest) {
        AuthenticationResponse result = authenticationService.authenticate(authenticationRequest);
        return ApiResponse.<AuthenticationResponse>builder().result(result).build();
    }
    @PostMapping("/introspect")
    public ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest introspectRequest) throws ParseException, JOSEException {
        IntrospectResponse result = authenticationService.introspect(introspectRequest);
        return ApiResponse.<IntrospectResponse>builder().result(result).build();
    }

//    @PostMapping("/logout")
//    public ApiResponse<Void> logout(@RequestBody AuthenticationRequest authenticationRequest) {
//        authenticationService.(authenticationRequest);
//        return ApiResponse.<Void>builder().build();
//    }





}
