import { ApiProperty } from '@nestjs/swagger';
import { Exclude, instanceToPlain } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { Project } from 'src/projects/project.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The username of the user.',
    example: 'testuser',
  })
  @IsString({ message: 'Username must be a string' })
  @Column()
  username: string;

  @ApiProperty({
    description: 'The password of the user.',
    example: 'password123',
  })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at lease 6 characters long' })
  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @OneToMany(() => Project, (project) => project.user, { cascade: true })
  projects: Project[];

  @ApiProperty({
    description: 'The email address of the user.',
    example: 'test@example.com',
  })
  @IsEmail({}, { message: 'Invalid email address' })
  @Column({ unique: true })
  email: string;

  toJSON() {
    return instanceToPlain(this);
  }
}
