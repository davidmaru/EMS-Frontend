import { gql, useMutation } from "@apollo/client";

export function useUpdateEvent(opts) {
  const UPDATE_EVENT = gql`
    mutation UpdateEvent($capacity: Int, $description: String,
      $duration: Int, $eventName: String, $eventType: String, 
      $id: Int!, $locationVenue: String, $schedule: String, 
      $startDateTime: DateTime, $status: String, 
      $ticketPrice: Decimal, $ticketQuantity: Int)
      {
        updateEvent(
          eventUpdate: {
            capacity: $capacity,
            description: $description,
            duration: $duration,
            eventName: $eventName,
            eventType: $eventType,
            id: $id,
            locationVenue: $locationVenue,
            schedule: $schedule,
            startDateTime: $startDateTime,
            status: $status,
            ticketPrice: $ticketPrice,
            ticketQuantity: $ticketQuantity
          }
        ) 
      }
    `
  return useMutation(UPDATE_EVENT, { ...opts })
}

export function useBatchUpdateUser(opts) {
  const BATCH_UPDATE_USER = gql`
    mutation UpdateUsers($users: [UserUpdateDtoInput!]!) {
      batchUpdateUser(users: $users)
      {
        success
        id
      }
    }`
  return useMutation(BATCH_UPDATE_USER, { ...opts });
}

export function useUpdateUser(opts) {
  const UPDATE_USER = gql`
    mutation UpdateUser(
      $id: Int!,
      $userName: String,
      $password: String,
      $roleId: Int,
      $userEmail: String
    )
    {
      updateUser(
        user: {
          id: $id,
          userName: $userName,
          password: $password,
          roleId: $roleId,
          userEmail: $userEmail
        }
    )
}`
  return useMutation(UPDATE_USER, { ...opts })
}