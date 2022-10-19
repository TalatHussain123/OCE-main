import React from 'react'
import Quiz from './Quiz'
import VisibilityManager from './visibility/VisibilityManager'

export default function QuizStart() {
  return (
    <>
    <VisibilityManager>
    {isVisible => (
        <Quiz active={isVisible}/>
    )}
    </VisibilityManager>
    </>
    )
}
    
    
