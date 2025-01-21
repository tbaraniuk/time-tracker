import { IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { Project } from '../projects/project.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'tags' })
export class Tag {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsString()
  @Column()
  name: string;

  @ApiProperty()
  @ManyToMany(() => Project, (project) => project.tags)
  project: Project[];

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;
}
