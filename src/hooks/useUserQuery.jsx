import { gql, useQuery } from "@apollo/client";

export function useUsersQuery(opts) {
    const Get_ALL_USERS = gql`
    query GetUsers {
        users {
            id
            userEmail
            userName
            role {
            id
            roleGroup
            }
        }
    }`;

    return useQuery(Get_ALL_USERS, opts);

}

export function useUserQuery(id, opts) {
    if (typeof id !== "number") {
        throw new Error("Id must be a number")
    }
    const GET_USER_BY_ID = gql`
        query GetUser($id: Int!){
        user(id: $id) {
            id
            userEmail
            userName
            role {
            id
            roleGroup
            }
        }
    }`;

    return useQuery(GET_USER_BY_ID, {
        variables: { id },
        ...opts
    })
}

export function useRolesQuery(opts) {
    const GET_Roles = gql`
    query GetRoles {
        roles {
            id
            roleGroup
        }
    }`;
    return useQuery(GET_Roles, opts);
}

export function useRoleQuery(id, opts) {
    if (typeof id !== "number") throw new Error("Id is a required field");
    const GET_ROLE = gql`
    query Get_Role($id: Int!) {
        role(id: $id) {
            id
            roleGroup
        }
    }
    `;
    return useQuery(GET_ROLE, {
        variables: { id },
        ...opts
    });
}

export function useEventTypes(opts) {
    const GET_TYPES = gql`
    query GetTypes{
        eventTypes
    }`
    return useQuery(GET_TYPES, opts)
}

export function useEventStatuses(opts) {
    const GET_STATUSES = gql`
    query GetStatuses{
        eventStatuses
}
    `
    return useQuery(GET_STATUSES, opts);
}

export function useEvents(opts) {
    const GET_EVENTS = gql`
    query GetEvents{
        events {
            capacity
            createdAt
            description
            duration
            eventName
            eventType
            id
            locationVenue
            organizerId
            schedule
            startDateTime
            status
            ticketPrice
            ticketQuantity
        }
        }
    `
    return useQuery(GET_EVENTS, opts)
}
export function useGetEvent(id, opts) {
    if (typeof id !== "number") {
        throw new Error("Id is a requered field")
    }
    const GET_EVENT = gql`
        query Get_Event($id: Int!){
            event(id: $id) {
                capacity
                createdAt
                description
                duration
                eventName
                eventType
                id
                locationVenue
                organizerId
                schedule
                startDateTime
                status
                ticketPrice
                ticketQuantity
            }
        }
    `
    return useQuery(GET_EVENT, {
        variables: { id },
        ...opts
    })
}

export function useRolesDetails(opts) {
    const GET_ROLES_DETAILS = gql`query getRolesDetails{
                     rolesDetails {
                    id 
                    permissions
                    roleGroup
                }
            }`
    return useQuery(GET_ROLES_DETAILS, opts)
}

export function usePermissions(opts) {
    const GET_PERMISSIONS = gql`query GetPermissions{
                 permissions
            }`
    return useQuery(GET_PERMISSIONS, opts);
}