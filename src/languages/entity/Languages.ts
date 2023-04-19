import { Column, Entity, Index } from "typeorm";

@Index("languages_pkey", ["id"], { unique: true })
@Entity("languages", { schema: "public" })
export class Languages {
  @Column("numeric", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "abrev" })
  abrev: string;

  @Column("text", { name: "code", nullable: true })
  code: string | null;

  @Column("text", { name: "icon", nullable: true })
  icon: string | null;
}
