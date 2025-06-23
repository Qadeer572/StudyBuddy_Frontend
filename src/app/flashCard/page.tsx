'use client'
import React, { useState, useEffect } from 'react';
import { ChevronDown, Plus, Brain, Play, BarChart3, Clock, ArrowLeft, RotateCcw, Eye, EyeOff, CheckCircle, XCircle, AlertCircle, BookOpen } from 'lucide-react';

// Utility function for class names
const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// UI Components defined in the same file
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    asChild?: boolean;
  }
>(({ className, variant = 'default', size = 'default', ...props }, ref) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-lg border bg-card text-white text-card-foreground shadow-sm", className)}
      {...props}
    />
  )
);

Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);

CardContent.displayName = "CardContent";

const Badge = ({ className, variant = 'default', ...props }: React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}) => {
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground",
  };

  return (
    <div 
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )} 
      {...props} 
    />
  );
};

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
);
Input.displayName = "Input";
const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
      {...props}
    />
  )
);
Label.displayName = "Label";
const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
);
Textarea.displayName = "Textarea";

const Dialog = ({ children, open, onOpenChange }: {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/80" 
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg">
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-4", className)} {...props}>
    {children}
  </div>
);

const DialogHeader = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props}>
    {children}
  </div>
);

const DialogTitle = ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props}>
    {children}
  </h2>
);

const Tabs = ({ children, defaultValue, className }: {
  children: React.ReactNode;
  defaultValue: string;
  className?: string;
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={className}>
      {React.Children.map(children, child => 
        React.isValidElement(child) 
          ? React.cloneElement(child, { activeTab, setActiveTab } as any)
          : child
      )}
    </div>
  );
};

const TabsList = ({ children, className }: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className)}>
    {children}
  </div>
);

const TabsTrigger = ({ value, children, activeTab, setActiveTab, className }: {
  value: string;
  children: React.ReactNode;
  activeTab?: string;
  setActiveTab?: (value: string) => void;
  className?: string;
}) => (
  <button
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      activeTab === value ? "bg-background text-foreground shadow-sm" : "",
      className
    )}
    onClick={() => setActiveTab?.(value)}
  >
    {children}
  </button>
);

const TabsContent = ({ value, children, activeTab, className }: {
  value: string;
  children: React.ReactNode;
  activeTab?: string;
  className?: string;
}) => {
  if (activeTab !== value) return null;
  
  return (
    <div className={cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}>
      {children}
    </div>
  );
};

// Mock data
const mockDecks = [
  {
    id: "1",
    name: "Advanced Mathematics - Calculus",
    subject: "Mathematics",
    cardCount: 45,
    dueCards: 12,
    mastered: 28,
    learning: 17,
    lastStudied: "2024-06-18",
    difficulty: "Hard",
    shared: false
  },
  {
    id: "2",
    name: "Physics - Quantum Mechanics",
    subject: "Physics",
    cardCount: 32,
    dueCards: 8,
    mastered: 20,
    learning: 12,
    lastStudied: "2024-06-17",
    difficulty: "Medium",
    shared: true
  },
  {
    id: "3",
    name: "Chemistry - Organic Compounds",
    subject: "Chemistry",
    cardCount: 28,
    dueCards: 15,
    mastered: 10,
    learning: 18,
    lastStudied: "2024-06-16",
    difficulty: "Medium",
    shared: false
  }
];

const mockFlashcards = [
  {
    id: "1",
    front: "What is the derivative of sin(x)?",
    back: "cos(x)",
    difficulty: "Medium",
    dueDate: "2024-06-20",
    interval: 3
  },
  {
    id: "2",
    front: "Define the limit of a function",
    back: "The limit of a function f(x) as x approaches a is the value that f(x) gets arbitrarily close to as x gets arbitrarily close to a, but not necessarily equal to a.",
    difficulty: "Hard",
    dueDate: "2024-06-20",
    interval: 1
  },
  {
    id: "3",
    front: "What is the integral of 1/x?",
    back: "ln|x| + C",
    difficulty: "Easy",
    dueDate: "2024-06-20",
    interval: 7
  }
];

const mockQuizQuestions = [
  {
    id: "1",
    question: "What is the derivative of sin(x)?",
    options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
    correctAnswer: 0,
    explanation: "The derivative of sin(x) is cos(x) by the basic differentiation rules."
  },
  {
    id: "2",
    question: "What is the integral of 1/x?",
    options: ["x²/2", "ln|x| + C", "1/x²", "e^x"],
    correctAnswer: 1,
    explanation: "The integral of 1/x is ln|x| + C, where C is the constant of integration."
  },
  {
    id: "3",
    question: "Which statement about limits is correct?",
    options: [
      "Limits always equal the function value at that point",
      "Limits describe the behavior of a function as it approaches a value",
      "Limits can only be calculated for continuous functions",
      "Limits are always infinity"
    ],
    correctAnswer: 1,
    explanation: "Limits describe the behavior of a function as the input approaches a particular value, regardless of whether the function is defined at that point."
  }
];

// Toast functionality
const useToast = () => {
  const [toasts, setToasts] = useState<Array<{ id: string; title: string; description: string }>>([]);

  const toast = ({ title, description }: { title: string; description: string }) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, title, description }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  return { toast, toasts };
};

// Toast component
const ToastContainer = ({ toasts }: { toasts: Array<{ id: string; title: string; description: string }> }) => (
  <div className="fixed top-4 right-4 z-50 space-y-2">
    {toasts.map(toast => (
      <div key={toast.id} className="bg-background border rounded-lg p-4 shadow-lg max-w-sm">
        <div className="font-semibold">{toast.title}</div>
        <div className="text-sm text-muted-foreground">{toast.description}</div>
      </div>
    ))}
  </div>
);

// Create Deck Dialog Component
const CreateDeckDialog = ({ open, onOpenChange }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [deckName, setDeckName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (deckName.trim() && subject.trim()) {
      toast({
        title: "Deck Created Successfully!",
        description: `"${deckName}" has been created in ${subject}`,
      });
      
      setDeckName("");
      setSubject("");
      setDescription("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Flashcard Deck</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="deckName">Deck Name</Label>
            <Input
              id="deckName"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              placeholder="e.g., Advanced Calculus"
              required
            />
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Mathematics"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the deck content..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Create Deck
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Flashcard Review Component
const FlashcardReview = ({ deck, onBack }: { deck: any; onBack: () => void }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0, again: 0 });
  const { toast } = useToast();

  const currentCard = mockFlashcards[currentCardIndex];
  const isLastCard = currentCardIndex === mockFlashcards.length - 1;

  const handleCardResponse = (response: "again" | "hard" | "good" | "easy") => {
    const newStats = { ...sessionStats };
    
    if (response === "again") {
      newStats.again++;
    } else if (response === "hard") {
      newStats.incorrect++;
    } else {
      newStats.correct++;
    }
    
    setSessionStats(newStats);

    if (isLastCard) {
      toast({
        title: "Review Session Complete!",
        description: `Reviewed ${mockFlashcards.length} cards. Good work!`,
      });
      onBack();
    } else {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const flipCard = () => {
    setShowAnswer(!showAnswer);
  };

  const resetCard = () => {
    setShowAnswer(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Button onClick={onBack} variant="outline" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Decks
          </Button>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">{deck.name}</h1>
              <p className="text-white">Card {currentCardIndex + 1} of {mockFlashcards.length}</p>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-green-600">{sessionStats.correct}</div>
                <div className="text-white">Correct</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-red-600">{sessionStats.incorrect}</div>
                <div className="text-white">Incorrect</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-yellow-600">{sessionStats.again}</div>
                <div className="text-white">Again</div>
              </div>
            </div>
          </div>

          <div className="w-full bg-white rounded-full h-2 mt-4">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentCardIndex + 1) / mockFlashcards.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="h-96 cursor-pointer" onClick={flipCard}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <Badge variant={currentCard.difficulty === "Easy" ? "secondary" : 
                              currentCard.difficulty === "Medium" ? "default" : "destructive"}>
                  {currentCard.difficulty}
                </Badge>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      resetCard();
                    }}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-1 text-sm text-white">
                    {showAnswer ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {showAnswer ? "Hide" : "Show"} Answer
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center p-6">
                {!showAnswer ? (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Question</h2>
                    <p className="text-lg">{currentCard.front}</p>
                    <p className="text-sm text-white mt-4">Click to reveal answer</p>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 text-green-600">Answer</h2>
                    <p className="text-lg">{currentCard.back}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {showAnswer && (
            <div className="flex justify-center gap-3 mt-6">
              <Button
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => handleCardResponse("again")}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Again
              </Button>
              <Button
                variant="outline"
                className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                onClick={() => handleCardResponse("hard")}
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Hard
              </Button>
              <Button
                variant="outline"
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
                onClick={() => handleCardResponse("good")}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Good
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleCardResponse("easy")}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Easy
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Quiz Mode Component
const QuizMode = ({ deck, onBack }: { deck: any; onBack: () => void }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();

  const currentQuestion = mockQuizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === mockQuizQuestions.length - 1;

  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizCompleted) {
      handleQuizComplete();
    }
  }, [timeLeft, quizCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      handleQuizComplete();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleQuizComplete = () => {
    setQuizCompleted(true);
    const percentage = Math.round((score / mockQuizQuestions.length) * 100);
    toast({
      title: "Quiz Complete!",
      description: `You scored ${score}/${mockQuizQuestions.length} (${percentage}%)`,
    });
  };

  if (quizCompleted) {
    const percentage = Math.round((score / mockQuizQuestions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
        <div className="container mx-auto p-6">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-green-600">Quiz Results</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="text-6xl font-bold text-purple-600">
                  {percentage}%
                </div>
                <div className="text-xl">
                  You scored {score} out of {mockQuizQuestions.length} questions correctly
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-green-600">{score}</div>
                    <div className="text-gray-500">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-red-600">{mockQuizQuestions.length - score}</div>
                    <div className="text-gray-500">Incorrect</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">{mockQuizQuestions.length}</div>
                    <div className="text-gray-500">Total</div>
                  </div>
                </div>
                <div className="flex gap-4 justify-center">
                  <Button onClick={onBack} variant="outline" className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500'>
                    Back to Decks
                  </Button>
                  <Button 
                    onClick={() => {
                      setCurrentQuestionIndex(0);
                      setSelectedAnswer(null);
                      setShowResult(false);
                      setScore(0);
                      setQuizCompleted(false);
                      setTimeLeft(300);
                    }}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Retake Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Button onClick={onBack} variant="outline" className="mb-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Decks
          </Button>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">{deck.name} - Quiz</h1>
              <p className="text-white">Question {currentQuestionIndex + 1} of {mockQuizQuestions.length}</p>
            </div>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Clock className="h-5 w-5" />
              <span className={timeLeft < 60 ? "text-red-600" : "text-blue-600"}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          <div className="w-full bg-white rounded-full h-2 mt-4">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentQuestionIndex + 1) / mockQuizQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  let buttonClass = "w-full text-left p-4 border rounded-lg transition-colors";
                  
                  if (showResult) {
                    if (index === currentQuestion.correctAnswer) {
                      buttonClass += " bg-green-100 border-green-500 text-green-700";
                    } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                      buttonClass += " bg-red-100 border-red-500 text-red-700";
                    } else {
                      buttonClass += " bg-gray-50 border-gray-200";
                    }
                  } else {
                    if (index === selectedAnswer) {
                      buttonClass += " bg-purple-100 border-purple-500";
                    } else {
                      buttonClass += " hover:bg-gray-50 border-gray-200";
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={buttonClass}
                      disabled={showResult}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">{String.fromCharCode(65 + index)}.</span>
                        <span>{option}</span>
                        {showResult && index === currentQuestion.correctAnswer && (
                          <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                        )}
                        {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                          <XCircle className="h-5 w-5 text-red-600 ml-auto" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {showResult && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
                  <p className="text-blue-700">{currentQuestion.explanation}</p>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                {!showResult ? (
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextQuestion}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isLastQuestion ? "Complete Quiz" : "Next Question"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Study Statistics Component
const StudyStats = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Todays Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">45</div>
            <p className="text-sm text-gray-600">Cards reviewed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Study Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">12</div>
            <p className="text-sm text-gray-600">Days in a row</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">2.5h</div>
            <p className="text-sm text-gray-600">This week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-white">Chart placeholder - Performance over time</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Main Flashcard Application Component
const CompleteFlashcardApp = () => {
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [activeMode, setActiveMode] = useState("overview");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { toast, toasts } = useToast();

  const handleStartReview = (deck: any) => {
    setSelectedDeck(deck);
    setActiveMode("review");
  };

  const handleStartQuiz = (deck: any) => {
    setSelectedDeck(deck);
    setActiveMode("quiz");
  };

  const handleBackToOverview = () => {
    setSelectedDeck(null);
    setActiveMode("overview");
  };

  if (activeMode === "review" && selectedDeck) {
    return (
      <>
        <FlashcardReview deck={selectedDeck} onBack={handleBackToOverview} />
        <ToastContainer toasts={toasts} />
      </>
    );
  }

  if (activeMode === "quiz" && selectedDeck) {
    return (
      <>
        <QuizMode deck={selectedDeck} onBack={handleBackToOverview} />
        <ToastContainer toasts={toasts} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Flashcards & Quizzes</h1>
          <p className="text-lg text-white">Master your subjects with active recall and spaced repetition</p>
        </div>

        <Tabs defaultValue="decks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger   value="decks" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              My Decks
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Study Statistics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="decks" className="space-y-6">
            <div className="flex gap-4">
              <Button 
            onClick={() => setShowCreateDialog(true)}
            className="bg-purple-600 hover:bg-purple-700"
              >
            <Plus className="h-4 w-4 mr-2" />
            Create New Deck
              </Button>
              
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDecks.map((deck) => (
            <Card key={deck.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                <CardTitle className="text-lg">{deck.name}</CardTitle>
                <CardDescription className="mt-1">{deck.subject}</CardDescription>
                  </div>
                  {deck.shared && (
                <Badge variant="secondary">Shared</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center">
                <div className="font-semibold text-green-600">{deck.mastered}</div>
                <div className="text-gray-500">Mastered</div>
                  </div>
                  <div className="text-center">
                <div className="font-semibold text-yellow-600">{deck.learning}</div>
                <div className="text-gray-500">Learning</div>
                  </div>
                  <div className="text-center">
                <div className="font-semibold text-red-600">{deck.dueCards}</div>
                <div className="text-gray-500">Due</div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                className="bg-purple-600 h-2 rounded-full" 
                style={{ width: `${(deck.mastered / deck.cardCount) * 100}%` }}
                  ></div>
                </div>

                <div className="flex gap-2">
                  <Button 
                onClick={() => handleStartReview(deck)}
                size="sm" 
                className="flex-1 text-white bg-blue-600 hover:bg-blue-700"
                  >
                <Brain className="h-4 w-4 mr-1" />
                Study
                  </Button>
                  <Button 
                onClick={() => handleStartQuiz(deck)}
                size="sm" 
                variant="outline" 
                className="flex-1 text-white"
                  >
                <Play className="h-4 w-4 mr-1" />
                Quiz
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  Last studied: {deck.lastStudied}
                </div>
              </CardContent>
            </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <StudyStats />
          </TabsContent>
        </Tabs>

        <CreateDeckDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
        <ToastContainer toasts={toasts} />
          </div>
        </div>
      );
    };
    export default CompleteFlashcardApp;