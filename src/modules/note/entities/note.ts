import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";

interface NoteProps{
    title: string
    description: string | null;
    userId: string;
    createAt: Date;
}


export class Note{
    private props: NoteProps;
    private _id: string

    constructor(
        props: Replace<NoteProps, {createAt?: Date; description?: string | null}>,
        id?: string,

    ) {
        this.props = {
            ... props,
            createAt: props.createAt ?? new Date(),
            description: props.description ?? null,
        };
        this._id = id || randomUUID();
    }

    get id(): string {
      return this._id;
    }
  
    get title(): string {
      return this.props.title;
    }
  
    set title(title: string) {
      this.props.title = title;
    }
  
    get description(): string | null {
      return this.props.description;
    }
  
    set description(description: string | null) {
      this.props.description = description;
    }
  
    get userId(): string {
      return this.props.userId;
    }
  
    get createdAt(): Date {
      return this.props.createAt || new Date(); // Retorna a data ou a nova data se não estiver definida
    }
}