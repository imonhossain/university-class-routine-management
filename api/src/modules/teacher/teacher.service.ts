import { CreateTeacherDto } from '@/dto/CreateTeacherDto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { TeacherEntity } from './teacher.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(TeacherEntity)
    private teacherRepository: Repository<TeacherEntity>,
  ) {}

  async getTeachers(): Promise<TeacherEntity[]> {
    return this.teacherRepository.find();
  }

  async createTeacher(createTeacherDto: CreateTeacherDto): Promise<TeacherEntity> {
    return this.teacherRepository.create(createTeacherDto).save();
  }

  async getTeacher(id: string): Promise<TeacherEntity> {
    return this.teacherRepository.findOne({ where: { id: id } });
  }

  async updateTeacher(id: string, updateTeacherDto: CreateTeacherDto): Promise<TeacherEntity> {
    const payload = updateTeacherDto as ObjectLiteral;
    await this.teacherRepository.update(id, payload);
    return this.getTeacher(id);
  }

  async deleteTeacher(id: string): Promise<void> {
    await this.teacherRepository.delete(id);
  }
}
