import { getMemberName } from "../utils/Common"
import { Member } from "./Member"

interface MemberOption extends Member{
    label: string,
    value: string
}

const MemberToMemberOption = (member: Member): MemberOption => {
    return {
        ...member,
        label: getMemberName(member),
        value: member.id
    }
}

export { type MemberOption as default, MemberToMemberOption }