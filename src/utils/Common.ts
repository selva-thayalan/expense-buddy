import { Member } from "../models/Member";

const getMemeberNameById = (members: Member[], id: string): string => {
    var member = members.find(mem => mem.id === id);
    return member ? `${member.firstName} ${member.lastName}` : "";
}

export { getMemeberNameById };