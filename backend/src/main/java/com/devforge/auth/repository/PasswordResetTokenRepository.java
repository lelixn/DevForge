package com.devforge.auth.repository;

import com.devforge.auth.entity.PasswordResetToken;
import com.devforge.common.persistence.BaseRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PasswordResetTokenRepository extends BaseRepository<PasswordResetToken, UUID> {

    Optional<PasswordResetToken> findByToken(String token);
}
