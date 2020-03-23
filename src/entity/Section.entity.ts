import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'

import { Resource } from './Resource.entity'
import { Page } from './Page.entity'
import { slug } from '../utils/slug'

@ObjectType()
@Entity()
export class Section extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  title: string

  @Field(() => Resource, { nullable: true })
  @ManyToOne(
    () => Resource,
    (resource) => resource.sections
  )
  resource: Promise<Resource>

  @Field(() => [Section])
  @OneToMany(
    () => Section,
    (section) => section.parentSection
  )
  sections: Promise<Section[]>

  @Field(() => Section, { nullable: true })
  @ManyToOne(
    () => Section,
    (section) => section.sections
  )
  parentSection: Promise<Section>

  @Field(() => Page, { nullable: true })
  @OneToOne(() => Page)
  @JoinColumn()
  page: Promise<Page>

  @Field(() => Boolean)
  async isPage(): Promise<boolean> {
    const subSections = await this.sections
    return !!(await this.page) || subSections.length == 0
  }

  @Field()
  isSection(): boolean {
    return !this.isPage()
  }

  @Field()
  isRoot(): boolean {
    return !this.parentSection
  }

  @Field()
  slug(): string {
    return slug(this.title)
  }
}
