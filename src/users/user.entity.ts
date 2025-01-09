import { Project } from 'src/projects/project.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @OneToMany(() => Project, (project) => project.user, { cascade: true })
  projects: Project[];

  @Column({ unique: true })
  email: string;
}
