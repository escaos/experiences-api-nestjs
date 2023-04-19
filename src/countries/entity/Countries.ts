import { Column, Entity, Index } from "typeorm";

@Index("countries_pkey", ["id"], { unique: true })
@Entity("countries", { schema: "public" })
export class Countries {
  @Column("numeric", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "code" })
  code: string;

  @Column("text", { name: "abrev" })
  abrev: string;

  @Column("numeric", { name: "languageId" })
  languageId: string;
}
