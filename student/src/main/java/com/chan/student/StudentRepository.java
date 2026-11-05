package com.chan.student;

import org.springframework.data.repository.CrudRepository;
public interface StudentRepository extends CrudRepository<Student, Integer> {
}
