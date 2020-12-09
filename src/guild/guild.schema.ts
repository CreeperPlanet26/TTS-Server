import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Member } from "./types/member.type";
import { Role } from "./types/role.type";

@Schema()
export class Guild extends Document {
    /**
     * The id of the TTS Server.
     */
    @Prop({ unique: true })
    id: string;

    /**
     * The name of the TTS Server.
     */
    @Prop()
    name: string;

    /**
     * The URL to the icon of the TTS server.
     */
    @Prop({ default: "https://cdn.discordapp.com/icons/570349873337991203/7f945e4de66e287e33e029043c99dd76.png?size=2048", required: false })
    iconUrl: string;

    @Prop()
    roles: Role[];

    @Prop()
    members: Member[];
}

export const GuildSchema = SchemaFactory.createForClass(Guild);