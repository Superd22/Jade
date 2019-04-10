import { Entity, PrimaryGeneratedColumn, Column, Unique, BaseEntity, PrimaryColumn } from "typeorm";
import { DiscordToken } from "../controllers/discord.controller";
import { DiscordUser } from "../interfaces/discord/user.interface";

@Entity()
@Unique(["email"])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    /** current e-mail */
    @PrimaryColumn()
    email: string;

    @Column({ type: "json", nullable: true })
    discordData: DiscordUser

    /** RSI handle */
    @Column({ nullable: true })
    handle: string;

    /** current discord token for this user */
    @Column({ type: "json", nullable: true })
    discordToken: DiscordToken



}
