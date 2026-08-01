package com.devforge.auth.repository;

import com.devforge.auth.entity.LoginHistory;
import com.devforge.common.persistence.BaseRepository;
import com.devforge.user.entity.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LoginHistoryRepository extends BaseRepository<LoginHistory, UUID> {

    List<LoginHistory> findByUserOrderByLoginTimeDesc(User user);
}
