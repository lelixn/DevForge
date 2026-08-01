package com.devforge.auth.repository;

import com.devforge.auth.entity.EmailVerificationToken;
import com.devforge.common.persistence.BaseRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface EmailVerificationTokenRepository extends BaseRepository<EmailVerificationToken, UUID> {

    Optional<EmailVerificationToken> findByToken(String token);
}
