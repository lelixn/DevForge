package com.devforge.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    private static final String SECURITY_SCHEME_NAME = "BearerAuthentication";

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("DevForge Enterprise Platform API")
                        .version("1.0.0")
                        .description("Production-grade backend foundation API for the DevForge SaaS platform.")
                        .contact(new Contact()
                                .name("DevForge Engineering Architecture Team")
                                .email("architecture@devforge.io")
                                .url("https://devforge.io"))
                        .license(new License()
                                .name("Proprietary - Enterprise Edition")
                                .url("https://devforge.io/terms")))
                .servers(List.of(
                        new Server().url("http://localhost:5000").description("Local Development Server"),
                        new Server().url("https://api.devforge.io").description("Production Gateway")
                ))
                .addSecurityItem(new SecurityRequirement().addList(SECURITY_SCHEME_NAME))
                .components(new Components()
                        .addSecuritySchemes(SECURITY_SCHEME_NAME, new SecurityScheme()
                                .name(SECURITY_SCHEME_NAME)
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("Enter JWT Bearer token to authorize requests")));
    }

    @Bean
    public GroupedOpenApi foundationApi() {
        return GroupedOpenApi.builder()
                .group("01-Foundation")
                .pathsToMatch("/api/v1/health/**", "/actuator/**")
                .build();
    }

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("02-Public-V1")
                .pathsToMatch("/api/v1/**")
                .build();
    }
}
