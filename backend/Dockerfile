# Multi-stage Dockerfile for DevForge Spring Boot Application

# Stage 1: Build
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn package -DskipTests -B

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
RUN addgroup -S devforge && adduser -S devforge -G devforge
USER devforge:devforge

COPY --from=builder /app/target/devforge-backend-1.0.0-SNAPSHOT.jar app.jar

EXPOSE 5000

ENV SPRING_PROFILES_ACTIVE=prod

ENTRYPOINT ["java", "-jar", "app.jar"]
