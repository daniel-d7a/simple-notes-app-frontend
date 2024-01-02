import { IGenericResponse } from "./../../../../Models/Base/igeneric-response";
import { IPaginatedResponse } from "../../../../Models/Base/ipaginated-response";
import { INote } from "../../../../Models/Note/INote";

export type NotesResponse = IGenericResponse<IPaginatedResponse<INote>>;
