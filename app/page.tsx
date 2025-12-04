"use client";

import { useState, useEffect } from "react";
import { books, calculateDaysRemaining, calculateRemainingPages, calculateDailyGoal } from "../utils/bookData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
    const [progress, setProgress] = useState<number[]>(Array(books.length).fill(0));

    useEffect(() => {
        const savedProgress = localStorage.getItem("mistbornProgress");
        if (savedProgress) {
            setProgress(JSON.parse(savedProgress));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("mistbornProgress", JSON.stringify(progress));
    }, [progress]);

    const handleProgressChange = (index: number, value: string) => {
        const newProgress = [...progress];
        newProgress[index] = value === "" ? 0 : Math.min(Number.parseInt(value) || 0, books[index].pages);
        setProgress(newProgress);
    };

    const remainingPages = calculateRemainingPages(progress);
    const daysRemaining = calculateDaysRemaining();
    const dailyGoal = calculateDailyGoal(remainingPages, daysRemaining);

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-primary drop-shadow-md">
                    Mistborn Reading Tracker
                </h1>
                <div className="grid gap-4 md:grid-cols-2">
                    {books.map((book, index) => (
                        <Card key={book.title} className="border-border/50">
                            <CardContent className="pt-6">
                                <div className="flex items-center space-x-2">
                                    <Label htmlFor={`progress-${index}`} className="w-24 text-primary font-semibold">
                                        {book.title}:
                                    </Label>
                                    <div className="flex items-center flex-1">
                                        <Input
                                            id={`progress-${index}`}
                                            type="number"
                                            value={progress[index] || ""}
                                            onChange={(e) => handleProgressChange(index, e.target.value)}
                                            min="0"
                                            max={book.pages}
                                            className="bg-input/50 border-input text-foreground flex-1"
                                        />
                                        <span className="text-sm text-muted-foreground ml-2 min-w-[60px] text-right">
                                            / {book.pages}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <Card className="mt-8 border-border/50">
                    <CardHeader>
                        <CardTitle className="text-primary text-2xl text-center">Reading Goal</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg mb-2 flex justify-between border-b border-border/30 pb-2">
                            <span className="text-foreground">Remaining pages:</span>
                            <span>
                                <span className="font-bold text-accent">{remainingPages}</span>
                                <span className="text-muted-foreground ml-2">
                                    / {books.reduce((sum, book) => sum + book.pages, 0)}
                                </span>
                            </span>
                        </p>
                        <p className="text-lg mb-2 flex justify-between border-b border-border/30 pb-2">
                            <span className="text-foreground">Days until December 5, 2028:</span>
                            <span className="font-bold text-accent">{daysRemaining}</span>
                        </p>
                        <p className="text-xl font-bold flex justify-between pt-2">
                            <span className="text-foreground">Daily reading goal:</span>
                            <span className="text-primary">{dailyGoal} pages</span>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
