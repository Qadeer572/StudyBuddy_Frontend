
'use client'
import React, { useState, useEffect } from 'react';
import { Plus, Brain, Play, BarChart3, Clock, ArrowLeft, RotateCcw, Eye, EyeOff, CheckCircle, XCircle, AlertCircle, BookOpen } from 'lucide-react';

// Utility function for class names
const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};
// UI Components
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
    default: "border-transparent bg-primary text-primary-foreground hover:bg-gray",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground",
  };
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-gray",
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-16 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
      {...props}
    />
  )
);
Label.displayName = "Label";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500",
        className
      )}
      ref={ref}
      {...props}
    />
  )
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

const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);
DialogTitle.displayName = "DialogTitle";

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
          ? React.cloneElement(child, { activeTab, setActiveTab } as Partial<{ activeTab: string; setActiveTab: (value: string) => void }>)
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

// Types
type deck = {
  id: number;
  name: string;
  subject: string;
  is_shared: boolean;
  cardCount: number;
  dueCards: number;
  mastered: number;
  learning: number;
  lastStudied: string;
  created_at: Date;
};

type flashCard = {
  id: string;
  deck_id: number;
  question: string;
  back: string;
  difficulty: "Easy" | "Medium" | "Hard";
  dueDate: string;
  interval: number;
};

type Quiz = {
  id: number;
  deck_id: number;
  score: number;
  total_questions: number;
};

type Question = {
  id: number;
  quiz_id: number;
  flashcard_id: number;
  question: string;
  options: string[];
  correctAnswer: number;
};

type Answer = {
  id: number;
  card_id: number;
  answer: string;
  explanation: string;
};

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
const CreateDeckDialog = ({ open, onOpenChange, subjects, onDeckCreated }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subjects: { id: string; name: string }[];
  onDeckCreated: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [deckName, setDeckName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (deckName.trim() && subject.trim()) {
      setLoading(true);
      try {
        const res = await fetch('https://studybuddys-454c3f01f785.herokuapp.com/flashcard/addCardDeck/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            subject: subject,
            name: deckName,
          }),
          credentials: 'include',
        });
        const data = await res.json();
        if (data.status) {
          toast({
            title: "Deck Created Successfully!",
            description: `"${deckName}" has been created in ${subjects.find(subj => subj.id === subject)?.name}`,
          });
          setDeckName("");
          setSubject("");
          setDescription("");
          onDeckCreated();
          onOpenChange(false);
        } else {
          throw new Error(data.message || "Failed to create deck");
        }
      } catch (error) {
        toast({
          title: "Error Creating Deck",
          description: "Please try again later.",
        });
        console.error("Error creating deck:", error);
      } finally {
        setLoading(false);
      }
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
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              required
            >
              <option value="" disabled>
                Select a subject
              </option>
              {subjects.map((subj) => (
                <option key={subj.id} value={subj.id}>
                  {subj.name}
                </option>
              ))}
            </select>
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
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={loading}>
              {loading ? "Creating..." : <><Plus className="h-4 w-4 mr-2" />Create Deck</>}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Flashcard Review Component
const FlashcardReview = ({ deck, onBack }: { deck: deck; onBack: () => void }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flashCards, setFlashCards] = useState<flashCard[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0, again: 0 });
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch Flashcards
        const resFlashcards = await fetch(`https://studybuddys-454c3f01f785.herokuapp.com/flashcard/getflashCards/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
          credentials: 'include',
        });
        const flashcardData = await resFlashcards.json();
        if (flashcardData.status) {
          const filteredCards = flashcardData.flashcards.filter((card: flashCard) => card.deck_id === deck.id);
          setFlashCards(filteredCards);
        }

        // Fetch Answers
        const resAnswers = await fetch('https://studybuddys-454c3f01f785.herokuapp.com/flashcard/getAnswer/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
          credentials: 'include',
        });
        const answerData = await resAnswers.json();
        if (answerData.status) {
          setAnswers(answerData.answers);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load data",
        });
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [deck.id]);

  const currentCard = flashCards[currentCardIndex];
  const currentAnswer = answers.find((answer) => answer.card_id === Number(currentCard?.id));
  const isLastCard = currentCardIndex === flashCards.length - 1;

  const handleCardResponse = async (response: "again" | "hard" | "good" | "easy") => {
    const newStats = { ...sessionStats };
    if (response === "again") {
      newStats.again++;
    } else if (response === "hard") {
      newStats.incorrect++;
    } else {
      newStats.correct++;
    }
    setSessionStats(newStats);
    await updateStatusCard();
    if (isLastCard) {
      toast({
        title: "Review Session Complete!",
        description: `Reviewed ${flashCards.length} cards. Good work!`,
      });
      onBack();
    } else {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const updateStatusCard = async () => {
    const mastered = sessionStats.correct;
    const learning = sessionStats.incorrect + sessionStats.again + sessionStats.correct;
    const dueCards = flashCards.length - learning;
    const success_rate = learning > 0 ? Math.round((mastered / learning) * 100) : 0;
    try {
      const res = await fetch('https://studybuddys-454c3f01f785.herokuapp.com/flashcard/updatStatusCard/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          deck_id: deck.id,
          mastered,
          learning,
          dueCards,
          success_rate,
        }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!data.status) {
        toast({
          title: "Error",
          description: "Failed to update deck status",
        });
      }
    } catch  {
      toast({
        title: "Error",
        description: "Failed to update deck status",
      });
    }
  };

  const flipCard = () => {
    setShowAnswer(!showAnswer);
  };

  const resetCard = () => {
    setShowAnswer(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
        <div className="container mx-auto p-6">
          <p className="text-white text-center">Loading flashcards...</p>
        </div>
      </div>
    );
  }

  if (flashCards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
        <div className="container mx-auto p-6">
          <Button onClick={onBack} variant="outline" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Decks
          </Button>
          <p className="text-white text-center">No flashcards available for this deck.</p>
        </div>
      </div>
    );
  }

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
              <p className="text-white">Card {currentCardIndex + 1} of {flashCards.length}</p>
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
              style={{ width: `${((currentCardIndex + 1) / flashCards.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="max-w-2xl mx-auto">
          <Card className="h-96 cursor-pointer" onClick={flipCard}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <Badge variant="secondary">
                  {currentCard?.difficulty || 'Unknown'}
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
                    <p className="text-lg">{currentCard?.question || 'No question available'}</p>
                    <p className="text-sm text-white mt-4">Click to reveal answer</p>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 text-green-600">Answer</h2>
                    <p className="text-lg">{currentAnswer?.answer || currentCard?.back || 'No answer available'}</p>
                    {currentAnswer?.explanation && (
                      <p className="text-sm text-gray-300 mt-2">{currentAnswer.explanation}</p>
                    )}
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
const QuizMode = ({ deck, onBack }: { deck: deck; onBack: () => void }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Reset states to avoid stale data
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(300);
    setQuizCompleted(false);
    setQuestions([]);
    setCurrentQuiz(null);

    const fetchQuizData = async () => {
      setIsLoading(true);
      try {
        console.log("Fetching quiz data for deck:", deck.id);
    
        // Fetch all quizzes
        const resQuizes = await fetch('https://studybuddys-454c3f01f785.herokuapp.com/flashcard/getQuizes/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
          credentials: 'include',
        });
        const quizData = await resQuizes.json();
        console.log("Quiz data response:", quizData);
    
        // Fetch all questions
        const resQuestions = await fetch('https://studybuddys-454c3f01f785.herokuapp.com/flashcard/getQuizQuestion/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
          credentials: 'include',
        });
        const questionData = await resQuestions.json();
        console.log("Question data response:", questionData);
    
        if (quizData.status && questionData.status) {
          // Find the specific quiz for this deck
          const deckQuiz = quizData.quizzes.find((quiz: Quiz) => quiz.deck_id === deck.id);
          console.log("Found deck quiz:", deckQuiz);
    
          if (deckQuiz) {
            setCurrentQuiz(deckQuiz);
    
            // The questionData.questions is a nested array structure
            // We need to flatten it and then filter for the specific quiz
            const allQuestions = questionData.questions.flat(); // Flatten the nested arrays
            console.log("All flattened questions:", allQuestions);
            
            // Filter questions for this specific quiz
            const filterQuestions = allQuestions.filter((question: Question) => question.quiz_id === deckQuiz.id);
            console.log("Filtered questions for quiz id:", deckQuiz.id, filterQuestions);
    
            if (filterQuestions.length === 0) {
              toast({
                title: "No Questions Available",
                description: "No questions found for this quiz."
              });
              setQuestions([]);
            } else {
              setQuestions(filterQuestions);
            }
          } else {
            console.log("No quiz found for deck:", deck.id);
            toast({
              title: "No Quiz Available",
              description: "No quiz found for the selected deck."
            });
            setQuestions([]);
            setCurrentQuiz(null);
          }
        } else {
          throw new Error("Invalid API response status");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load quiz data"
        });
        console.error("Error fetching quiz data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizData();
  }, [deck.id]);
  const currentQuestion = questions[currentQuestionIndex];
  
  console.log("Initialize Current Question with index :",currentQuestionIndex,currentQuestion)
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const updateScore = async ()=>{
    const res= await fetch('https://studybuddys-454c3f01f785.herokuapp.com/flashcard/updatQuizScore/',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        quiz_id: currentQuiz?.id,
        score: score
      }),
      credentials: 'include',
    })

    const data = await res.json();
    if(data.status){
      //
    }
    else{
      toast({
        title: "Error",
        description: "Failed to update quiz score",
      });
    }
  }
  const handleQuizComplete = () => {
    setQuizCompleted(true);
    const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
    toast({
      title: "Quiz Complete!",
      description: `You scored ${score}/${questions.length} (${percentage}%)`,
    });
    updateScore();
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
        <div className="container mx-auto p-6">
          <p className="text-white text-center">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
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
                  You scored {score} out of {questions.length} questions correctly
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-green-600">{score}</div>
                    <div className="text-gray-500">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-red-600">{questions.length - score}</div>
                    <div className="text-gray-500">Incorrect</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">{questions.length}</div>
                    <div className="text-gray-500">Total</div>
                  </div>
                </div>
                <div className="flex gap-4 justify-center">
                  <Button onClick={onBack} variant="outline" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500">
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

  if (!currentQuestion || questions.length === 0) {
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
        <div className="container mx-auto p-6">
          <Button onClick={onBack} variant="outline" className="mb-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Decks
          </Button>
          <div className="text-center">
            <p className="text-white text-xl mb-4">No questions available for this quiz.</p>
            {currentQuiz ? (
              <p className="text-gray-300">Quiz found (ID: {currentQuiz.id}) but no questions are available.</p>
            ) : (
              <p className="text-gray-300">No quiz found for this deck.</p>
            )}
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
              <p className="text-white">Question {currentQuestionIndex + 1} of {questions.length}</p>
              {currentQuiz && (
                <p className="text-sm text-gray-300">Quiz ID: {currentQuiz.id} | Total Questions: {currentQuiz.total_questions}</p>
              )}
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
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
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
                {Array.isArray(currentQuestion?.options) && currentQuestion.options.map((option, index) => {
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
                  <p className="text-blue-700">Correct answer: {currentQuestion.options[currentQuestion.correctAnswer]}</p>
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
            <p className="text-sm text-gray-500">Cards reviewed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Study Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">12</div>
            <p className="text-sm text-gray-500">Days in a row</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">2.5h</div>
            <p className="text-sm text-gray-500">This week</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Weekly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-black">Chart placeholder - Performance over time</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Main Flashcard Application Component
const CompleteFlashcardApp = () => {
  const [selectedDeck, setSelectedDeck] = useState<deck | null>(null);
  const [activeMode, setActiveMode] = useState<"overview" | "review" | "quiz">("overview");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { toast, toasts } = useToast();
  const [decks, setDecks] = useState<deck[]>([]);
  const [subjects, setSubjects] = useState<{ id: number; name: string; description: string }[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getSubjects = async () => {
      try {
        const res = await fetch('https://studybuddys-454c3f01f785.herokuapp.com/studyplanner/allSubjects/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
          credentials: 'include',
        });
        const data = await res.json();
        if (data.status) {
          setSubjects(data.subjects);
        } else {
          toast({
            title: "Error",
            description: "Failed to load subjects",
          });
        }
      } catch {
        toast({
          title: "Error",
          description: "Failed to load subjects",
        });
      }
    };

    const getDecks = async () => {
      try {
        const res = await fetch('https://studybuddys-454c3f01f785.herokuapp.com/flashcard/getDecks/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
          credentials: 'include',
        });
        const data = await res.json();
        if (data.status) {
          setDecks(data.decks);
        } else {
          toast({
            title: "Error",
            description: "Failed to load decks",
          });
        }
      } catch {
        toast({
          title: "Error",
          description: "Failed to load decks",
        });
      }
    };

    getSubjects();
    getDecks();
  }, [refresh]);

  const handleDeckCreated = () => {
    setRefresh(prev => !prev);
  };

  const handleStartReview = (deck: deck) => {
    setSelectedDeck(deck);
    setActiveMode("review");
  };

  const handleStartQuiz = (deck: deck) => {
    setSelectedDeck(deck);
    setActiveMode("quiz");
  };

  const handleBackToOverview = () => {
    setSelectedDeck(null);
    setActiveMode("overview");
  };

  if (activeMode === "review" && selectedDeck) {
    return <FlashcardReview deck={selectedDeck} onBack={handleBackToOverview} />;
  }

  if (activeMode === "quiz" && selectedDeck) {
    return <QuizMode deck={selectedDeck} onBack={handleBackToOverview} />;
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
            <TabsTrigger value="decks" className="flex items-center gap-2">
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
              {decks.map((deck) => (
                <Card key={deck.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{deck.name}</CardTitle>
                        <CardDescription className="mt-1">{deck.subject}</CardDescription>
                      </div>
                      {deck.is_shared && (
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
        <CreateDeckDialog
          open={showCreateDialog}
          onOpenChange={setShowCreateDialog}
          subjects={subjects.map(subject => ({ id: subject.id.toString(), name: subject.name }))}
          onDeckCreated={handleDeckCreated}
        />
        <ToastContainer toasts={toasts} />
      </div>
    </div>
  );
};

export default CompleteFlashcardApp;
