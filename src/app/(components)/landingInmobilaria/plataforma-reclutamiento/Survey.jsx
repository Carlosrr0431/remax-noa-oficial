'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { questions } from './data/questions'

export default function Survey({ onComplete }) {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState(Array(questions.length).fill(0))

    const handleAnswer = (score) => {
        const newAnswers = [...answers]
        newAnswers[currentQuestion] = score
        setAnswers(newAnswers)

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            const totalScore = newAnswers.reduce((sum, score) => sum + score, 0)
            const finalScore = (totalScore / (questions.length * 5)) * 100
            onComplete(finalScore)
        }
    }

    const currentQuestionData = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-bold text-center text-gray-800">
                    Encuesta de Evaluación
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="space-y-6">
                    <div className="space-y-2 ">
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
                            <span>{Math.round(progress)}% completado</span>
                        </div>
                        <Progress value={progress} className="w-full h-2 bg-gray-300 fill-black" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-700 text-center mb-4">
                        {currentQuestionData.question}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {currentQuestionData.answers.map((answer, index) => (
                            <Button
                                key={index}
                                onClick={() => handleAnswer(answer.score)}
                                variant="outline"
                                className="p-4 h-auto text-left flex items-center justify-start hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                                <span className="text-lg">{answer.text}</span>
                            </Button>
                        ))}
                    </div>
                </div>
            </CardContent>
            {currentQuestion === questions.length - 1 && (
                <CardFooter>
                    {/* <Button
                        onClick={() => {
                            const totalScore = answers.reduce((sum, score) => sum + score, 0)
                            const finalScore = (totalScore / (questions.length * 5)) * 100
                            onComplete(finalScore)
                        }}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                        Finalizar Encuesta
                    </Button> */}
                </CardFooter>
            )}
        </Card>
    )
}
