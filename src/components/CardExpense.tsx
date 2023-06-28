import React, { useState } from 'react'
import CardBox from './CardBox'
import { ExpenseProps } from '../screens/Expenses'
import { HStack, Pressable, Text, VStack } from 'native-base'
import { AvatarGroup } from './MemberAvatar'
import dayjs from 'dayjs'
import { getUserPart, isExpired, isPaid } from '../helpers/expenseHelper'
import { useAuth } from '../hooks/useAuth'
import ExpenseStatusMessage, {
  ExpenseStatusMessageSetup
} from './ExpenseStatusMessage'

interface CardExpenseProps {
  expense: ExpenseProps
  handlePress?: (expense: ExpenseProps) => void
}
export function CardExpense({ expense, handlePress }: CardExpenseProps) {
  const { user } = useAuth()

  const userPart = getUserPart(expense.Paying, user.email)

  const [statusMessage, setStatusMessage] = useState<ExpenseStatusMessageSetup>(
    {
      status: null,
      color: '',
      message: ''
    }
  )

  return (
    <CardBox borderLeftColor={statusMessage.color} borderLeftWidth={4}>
      <Pressable
        style={{
          padding: 16
        }}
        onPress={handlePress ? () => handlePress(expense) : undefined}
      >
        <VStack space={1}>
          <HStack justifyContent="space-between" alignItems="center">
            <Text color="white" fontSize="lg">
              {expense.title}
            </Text>
            <Text color="white" fontSize="sm">
              {dayjs(expense.dueDate).format('DD/MM/YYYY')}
            </Text>
          </HStack>
          <HStack justifyContent="space-between" alignItems="center">
            <Text color="white" fontSize="lg">
              R$ {userPart}
            </Text>
            <ExpenseStatusMessage
              expense={expense}
              getStatusMessage={setStatusMessage}
            />
          </HStack>
          <HStack justifyContent="space-between" alignItems="center">
            <Text color="white" fontSize="md">
              Total: R$ <Text fontWeight="extrabold">{expense.cost}</Text>
            </Text>
            <AvatarGroup
              size="sm"
              members={expense.Paying.map(({ paying }) => paying)}
            />
          </HStack>
        </VStack>
      </Pressable>
    </CardBox>
  )
}