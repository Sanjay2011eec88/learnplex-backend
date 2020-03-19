import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'

import { Section } from './Section.entity'
import { User } from './User.entity'
import { Topic } from './Topic.entity'

@ObjectType()
@Entity()
export class Resource extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  title: string

  @Field(() => [Section])
  @OneToMany(
    () => Section,
    (section) => section.resource
  )
  sections: Section[]

  @Field(() => User)
  @ManyToOne(
    () => User,
    (user) => user.resources
  )
  user: User

  @Field(() => Topic)
  @ManyToOne(() => Topic, (topic) => topic.resources)
  topic: Topic

  @Field()
  @Column('bool', { default: false })
  verified: boolean
}