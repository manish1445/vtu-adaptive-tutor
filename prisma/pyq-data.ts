export interface PyqEntry {
  moduleNumber: number;
  topicName: string;
  content: string;
}

export const pyqData: PyqEntry[] = [
  // ===== MODULE 1: Fundamentals of Logic =====
  { moduleNumber: 1, topicName: 'Propositions and Logical Connectives', content: 'Define the following with an example for each: Proposition, Compound proposition, Simple proposition, Negation, Conjunction, Disjunction (Inclusive and Exclusive), Conditional, Converse, Inverse, Contrapositive, Bi-Conditional, Tautology, Contradiction, Contingency, Logical equivalence, Duality of proposition, Direct proof, Indirect proof, Proof by contradiction, Disproof by contradiction.' },

  { moduleNumber: 1, topicName: 'Tautology, Contradiction, Contingency', content: 'Define tautology. Determine whether the compound statement {(p or q) -> r} <-> {~r -> ~(p or q)} is a tautology or not.' },
  { moduleNumber: 1, topicName: 'Tautology, Contradiction, Contingency', content: 'Define tautology. Show that {(p or q) and (p -> r) and (q -> r)} -> r is a tautology by constructing the truth table.' },
  { moduleNumber: 1, topicName: 'Tautology, Contradiction, Contingency', content: 'Verify that, for any three propositions p, q, r, the compound proposition [p -> (q -> r)] -> [(p -> q) -> (p -> r)] is a tautology or not.' },
  { moduleNumber: 1, topicName: 'Tautology, Contradiction, Contingency', content: 'p and q are primitive statements with p -> q false. Determine the truth values of: (a) p and q, (b) ~p or q, (c) q -> p, (d) ~q -> ~p.' },
  { moduleNumber: 1, topicName: 'Tautology, Contradiction, Contingency', content: 'Given p, q, r have truth values 0, 0, 1 respectively, find the truth value of: (a) p -> (q and r), (b) (p or q) or r, (c) (p and q) -> r, (d) p -> [q -> (~r)].' },
  { moduleNumber: 1, topicName: 'Tautology, Contradiction, Contingency', content: 'Show that the following propositions are tautologies: (a) (p or q) <-> (q or p), (b) [p and (p -> q)] -> q, (c) [~(p or q) or (~p and q) or p].' },
  { moduleNumber: 1, topicName: 'Tautology, Contradiction, Contingency', content: 'Show that [(p -> r) and (q -> r)] -> [(p or q) -> r] is a tautology.' },

  { moduleNumber: 1, topicName: 'Logical Equivalence and Laws of Logic', content: 'By constructing a truth table show that [(p or q) -> r] is equivalent to [(p -> r) and (q -> r)].' },
  { moduleNumber: 1, topicName: 'Logical Equivalence and Laws of Logic', content: 'Use truth tables to establish: (a) ~(p or q) <=> ~p and ~q, (b) (p -> q) <=> ~p or q, (c) (p xor q) <=> (p or q) and (~p or ~q), (d) p <-> q <=> (p and q) or (~p and ~q), (e) [p -> (q and r)] <=> [(p -> q) and (p -> r)].' },
  { moduleNumber: 1, topicName: 'Logical Equivalence and Laws of Logic', content: 'Prove using laws of logic: [~p and (~q and r)] or [(q and r) or (p and r)] <=> r.' },
  { moduleNumber: 1, topicName: 'Logical Equivalence and Laws of Logic', content: 'Using laws of logic, prove: [(~p or ~q) and (F0 or p) and p] <=> p and ~q.' },
  { moduleNumber: 1, topicName: 'Logical Equivalence and Laws of Logic', content: 'Write down the dual of A = [(p or T0) and (q or F0)] or [(r and s) and T0].' },
  { moduleNumber: 1, topicName: 'Logical Equivalence and Laws of Logic', content: 'Verify the principle of duality for: [~(p and q) -> {~p or (~p or q)}] <=> ~p or q.' },
  { moduleNumber: 1, topicName: 'Logical Equivalence and Laws of Logic', content: 'Prove the following equivalences using the laws of logic and write their duals: (a) (p -> q) and [~q and (r or ~q)] <=> ~(q or p), (b) [(~p or ~q) -> (p and q and r)] <=> (p and q), (c) p -> (q -> r) <=> (p and q) -> r.' },

  { moduleNumber: 1, topicName: 'Direct and Indirect Proofs', content: 'Give direct and indirect proof of: product of two odd integers is an odd integer.' },
  { moduleNumber: 1, topicName: 'Direct and Indirect Proofs', content: 'Prove that for all integers k and l, if k and l are both odd, then k+l is even and kl is odd, by direct proof.' },
  { moduleNumber: 1, topicName: 'Direct and Indirect Proofs', content: 'For any two odd integers m and n, show that (i) m+n is even (ii) mn is odd.' },
  { moduleNumber: 1, topicName: 'Direct and Indirect Proofs', content: 'Prove directly and indirectly that the square of an even integer is always an even integer.' },
  { moduleNumber: 1, topicName: 'Direct and Indirect Proofs', content: 'Disprove by contradiction: if m is an even integer then m+7 is an even integer.' },

  { moduleNumber: 1, topicName: 'Rules of Inference', content: 'Write the following argument in symbolic form and establish its validity: If A gets the Supervisor position and works hard, then he will get a raise. If he gets a raise, then he will buy a car. He has not purchased a car. Therefore, he did not get the Supervisor position or he did not work hard.' },
  { moduleNumber: 1, topicName: 'Rules of Inference', content: 'Test the validity of the argument using rules of inference: (~p or q) -> r, r -> (s or t), ~s and ~u, ~u -> ~t, therefore p.' },
  { moduleNumber: 1, topicName: 'Rules of Inference', content: 'Establish the validity of the argument using rules of inference: p -> q, q -> (t and s), ~r or (~t or u), p and t, therefore u.' },

  { moduleNumber: 1, topicName: 'Quantifiers and Predicates', content: 'Define: Argument, Open statements, Quantifiers, Universal quantifiers, Existential quantifiers, Quantified statement.' },
  { moduleNumber: 1, topicName: 'Quantifiers and Predicates', content: 'Check the validity of the argument: If a triangle has two equal sides, then it is isosceles. If isosceles, then it has two equal angles. Triangle ABC does not have two equal angles. Therefore triangle ABC does not have two equal sides.' },
  { moduleNumber: 1, topicName: 'Quantifiers and Predicates', content: 'Determine if valid: No Engineering student is bad in studies. Anil is not bad in studies. Therefore Anil is an Engineering student.' },
  { moduleNumber: 1, topicName: 'Quantifiers and Predicates', content: 'Test validity: All Engineering students study Physics. All AI & DS Engineering students study Logic. Ravi is an Engineering student who does not study Logic. Sachin studies Logic but not Physics. Therefore Ravi is not an AI & DS student and Sachin is not an Engineering student.' },
  { moduleNumber: 1, topicName: 'Quantifiers and Predicates', content: 'For non-zero integers, determine truth value of: (a) there exist x,y with xy=1, (b) there exists x for all y with xy=1, (c) for all x there exists y with xy=1, (d) there exist x,y with 2x+y=5 and x-3y=-8, (e) there exist x,y with 3x-y=7 and 2x+4y=3.' },
  { moduleNumber: 1, topicName: 'Quantifiers and Predicates', content: 'Determine truth value for non-zero integers universe: (a) there exist x,y with xy=2, (b) there exists x for all y with xy=2, (c) for all x there exists y with xy=2, (d) there exist x,y with 3x+y=8 and 2x-y=7, (e) there exist x,y with 4x+2y=3 and x-y=1.' },
  { moduleNumber: 1, topicName: 'Quantifiers and Predicates', content: 'Given p(x): x>=0, q(x): x^2>0, r(x): x^2-3x-4=0, s(x): x^2-3>0 on reals, find truth value of: (a) there exists x with p(x) and q(x), (b) for all x, p(x)->q(x), (c) for all x, q(x)->s(x), (d) for all x, r(x) or s(x).' },

  // ===== MODULE 2: Properties of Integers =====
  { moduleNumber: 2, topicName: 'Mathematical Induction', content: 'State the well ordering principle. By mathematical induction, prove that 1+2+3+...+n = n(n+1)/2 for positive integers n.' },
  { moduleNumber: 2, topicName: 'Mathematical Induction', content: 'Prove by mathematical induction that 1^2 + 3^2 + 5^2 + ... + (2n-1)^2 = n(2n+1)(2n-1)/3.' },
  { moduleNumber: 2, topicName: 'Mathematical Induction', content: 'Prove by mathematical induction that 1^2 + 2^2 + 3^2 + ... + n^2 = n(n+1)(2n+1)/6.' },
  { moduleNumber: 2, topicName: 'Mathematical Induction', content: 'By mathematical induction prove that 1x3 + 2x4 + ... + n(n+2) = n(n+1)(2n+7)/6.' },
  { moduleNumber: 2, topicName: 'Mathematical Induction', content: 'By mathematical induction prove that for positive integer n, 11^(n+2) + 12^(2n+1) is divisible by 133.' },
  { moduleNumber: 2, topicName: 'Mathematical Induction', content: 'Prove by mathematical induction that for every positive integer n, 5 divides (n^5 - n).' },
  { moduleNumber: 2, topicName: 'Mathematical Induction', content: 'Prove that 4n < (n^2 - 7) for all positive integers n >= 6.' },
  { moduleNumber: 2, topicName: 'Mathematical Induction', content: 'State the well ordering principle. By mathematical induction prove that n! >= 2^(n-1) for all positive integers.' },
  { moduleNumber: 2, topicName: 'Mathematical Induction', content: 'Prove for any positive integer n, the sum of F(i-1)/2^i from i=1 to n equals 1 - F(n+2)/2^n, where F denotes Fibonacci numbers.' },
  { moduleNumber: 2, topicName: 'Mathematical Induction', content: 'For the Fibonacci sequence F0, F1, F2, ..., prove that Fn = (1/sqrt(5))[((1+sqrt(5))/2)^n - ((1-sqrt(5))/2)^n].' },
  { moduleNumber: 2, topicName: 'Mathematical Induction', content: 'If F0, F1, F2, ... are Fibonacci numbers, prove that the sum of Fi^2 from i=0 to n equals Fn times F(n+1).' },
  { moduleNumber: 2, topicName: 'Mathematical Induction', content: 'For the Lucas sequence L0, L1, L2, ..., prove that Ln = ((1+sqrt(5))/2)^n + ((1-sqrt(5))/2)^n.' },

  { moduleNumber: 2, topicName: 'Recursive Definitions', content: 'Obtain the recurrence definition for the sequences: an=5n, an=3n+7, an=n^2, an=2-(-1)^n.' },
  { moduleNumber: 2, topicName: 'Recursive Definitions', content: 'Let a0=1, a1=2, a2=3 and an = a(n-1) + a(n-2) + a(n-3) for n>=3. Prove that an <= 3^n for all positive integers.' },

  { moduleNumber: 2, topicName: 'Permutations and Combinations', content: 'Find the number of permutations of the letters of the word MASSASAUGA. In how many of these are all four As together? How many begin with S?' },
  { moduleNumber: 2, topicName: 'Permutations and Combinations', content: 'Find the number of arrangements of the letters of the word TALLAHASSEE which have no adjacent As.' },
  { moduleNumber: 2, topicName: 'Permutations and Combinations', content: 'Find the number of permutations of the letters of the word ENGINEERING such that: (i) all Es are together (ii) arrangements begin with N (iii) all vowels are adjacent.' },
  { moduleNumber: 2, topicName: 'Permutations and Combinations', content: 'How many arrangements are there for all the letters in SOCIOLOGICAL? In how many are (i) A and G adjacent (ii) all vowels adjacent?' },
  { moduleNumber: 2, topicName: 'Permutations and Combinations', content: 'How many positive integers n can we form using digits 3,4,4,5,5,6,7 if n must exceed 5,000,000?' },
  { moduleNumber: 2, topicName: 'Permutations and Combinations', content: 'How many words can be made from the letters of STATISTICS (with or without meaning)? In how many are a and c adjacent? In how many are vowels together?' },
  { moduleNumber: 2, topicName: 'Permutations and Combinations', content: 'In how many ways can we distribute 7 apples and 5 oranges among 3 children such that each child gets at least one apple and one orange?' },
  { moduleNumber: 2, topicName: 'Permutations and Combinations', content: 'In how many ways can one distribute 8 identical marbles in 4 distinct containers so that (i) no container is empty (ii) the fourth container has an odd number of marbles?' },
  { moduleNumber: 2, topicName: 'Permutations and Combinations', content: 'A woman has 11 close relations and wishes to invite 5 to dinner. In how many ways if (i) no restriction (ii) 2 persons will not attend separately (iii) 2 persons will not attend together?' },

  { moduleNumber: 2, topicName: 'Binomial Theorem', content: 'Find the coefficient of a^2 b^3 c^2 d^5 in the expansion of (a + 2b - 3c + 2d + 5)^16.' },
  { moduleNumber: 2, topicName: 'Binomial Theorem', content: 'Find the coefficient of x^3 y^8 in the expansion of (2x - y)^11.' },
  { moduleNumber: 2, topicName: 'Binomial Theorem', content: 'Find the coefficient of x^9 y^3 in the expansion of (2x - 3y)^12.' },
  { moduleNumber: 2, topicName: 'Binomial Theorem', content: 'Find the coefficient of x y z^2 in the expansion of (2x - y - z)^4.' },
  { moduleNumber: 2, topicName: 'Binomial Theorem', content: 'Find the coefficient of a^5 b^2 in the expansion of (2a - 3b)^7.' },
  { moduleNumber: 2, topicName: 'Binomial Theorem', content: 'Find the coefficient of x^5 y^2 in the expansion of (x + y)^7.' },
  { moduleNumber: 2, topicName: 'Binomial Theorem', content: 'Find the coefficient of x^12 in the expansion of x^3 (1 - 2x)^10.' },

  // ===== MODULE 3: Relations and Functions =====
  { moduleNumber: 3, topicName: 'Cartesian Product of Sets', content: 'Define cartesian product of two sets.' },
  { moduleNumber: 3, topicName: 'Cartesian Product of Sets', content: 'Define power set. For sets A,B,C subsets of U, prove: (a) A x (B union C) = (AxB) union (AxC), (b) A x (B intersect C) = (AxB) intersect (AxC), (c) (A union B) x C = (AxC) union (BxC), (d) (A intersect B) x C = (AxC) intersect (BxC).' },

  { moduleNumber: 3, topicName: 'Relations and Their Properties', content: 'If A has m elements and B has n elements, find the number of relations from A to B.' },
  { moduleNumber: 3, topicName: 'Relations and Their Properties', content: 'Let A and B be finite sets with |B|=3. If there are 4096 relations from A to B, find |A|.' },
  { moduleNumber: 3, topicName: 'Relations and Their Properties', content: 'Let A={1,2,3}, B={2,4,5}. Find: (a) |AxB| (b) number of relations from A to B (c) number of binary relations on A (d) relations containing (1,2) and (1,5) (e) relations with exactly five ordered pairs (f) binary relations on A with at least seven ordered pairs.' },
  { moduleNumber: 3, topicName: 'Relations and Their Properties', content: 'Let A={1,2,3,4,6}, R defined by (a,b) in R iff a is a multiple of b. Write R as a set of ordered pairs.' },

  { moduleNumber: 3, topicName: 'Equivalence Relations and Partial Orders', content: 'Let N be natural numbers, R defined by (a,b) in R iff a-b is divisible by 5. Prove R is an equivalence relation.' },
  { moduleNumber: 3, topicName: 'Equivalence Relations and Partial Orders', content: 'Let A={1,2,3,4,5}, R on AxA defined by (x1,y1)R(x2,y2) iff x1+y1=x2+y2. Verify R is an equivalence relation and determine the equivalence class of (2,4).' },

  { moduleNumber: 3, topicName: 'Hasse Diagrams and Lattices', content: 'Let A={1,2,3,4}, xRy iff x<y. Write R as ordered pairs, write the relation matrix, draw the digraph, and list indegrees/outdegrees.' },
  { moduleNumber: 3, topicName: 'Hasse Diagrams and Lattices', content: 'Let A={1,2,3,4,6}, aRb iff a is a multiple of b. Represent R as a matrix M(R), draw the digraph, and list indegree and outdegree.' },
  { moduleNumber: 3, topicName: 'Hasse Diagrams and Lattices', content: 'If R on A={1,2,3,4} is defined by xRy iff x divides y, prove (A,R) is a POSET and draw its Hasse diagram.' },
  { moduleNumber: 3, topicName: 'Hasse Diagrams and Lattices', content: 'Draw the Hasse diagram representing the positive divisors of 36.' },
  { moduleNumber: 3, topicName: 'Hasse Diagrams and Lattices', content: 'Draw the Hasse diagram representing the positive divisors of 72.' },
  { moduleNumber: 3, topicName: 'Hasse Diagrams and Lattices', content: 'Let A={1,2,3,6,9,12,18}, xRy iff x divides y. Prove (A,R) is a POSET and draw the Hasse diagram.' },
  { moduleNumber: 3, topicName: 'Hasse Diagrams and Lattices', content: 'For A={a,b,c,d,e} with a given Hasse diagram for POSET (A,R): (i) determine the relation matrix for R (ii) construct the digraph for R.' },

  { moduleNumber: 3, topicName: 'Functions and the Pigeonhole Principle', content: 'Let A={a,b,c,d}, B={1,2,3,4,5}. Find the number of one-one and onto functions from (i) A to B (ii) B to A.' },
  { moduleNumber: 3, topicName: 'Functions and the Pigeonhole Principle', content: 'State the pigeonhole principle. Prove that among any 29 persons, at least 5 were born on the same day of the week.' },
  { moduleNumber: 3, topicName: 'Functions and the Pigeonhole Principle', content: 'State the pigeonhole principle. Prove that if any numbers from 1 to 8 are chosen, two of them will sum to 9.' },
  { moduleNumber: 3, topicName: 'Functions and the Pigeonhole Principle', content: 'Using the pigeonhole principle, find the minimum number of persons needed so at least 5 share a birthday month.' },
  { moduleNumber: 3, topicName: 'Functions and the Pigeonhole Principle', content: 'How many persons must be chosen so that at least five share a birth month?' },
  { moduleNumber: 3, topicName: 'Functions and the Pigeonhole Principle', content: 'State the pigeonhole principle. Show that if n+1 numbers are chosen from 1 to 2n, at least one pair sums to 2n+1.' },
  { moduleNumber: 3, topicName: 'Functions and the Pigeonhole Principle', content: 'State the pigeonhole principle. Prove that if 30 dictionaries contain a total of 61,327 pages, at least one dictionary has at least 2045 pages.' },
  { moduleNumber: 3, topicName: 'Functions and the Pigeonhole Principle', content: 'Let A={1,2,3,4}, B={1,2,3,4,5,6}. (i) How many functions from A to B? (ii) how many one-to-one? (iii) how many functions from B to A? (iv) how many onto?' },
  { moduleNumber: 3, topicName: 'Functions and the Pigeonhole Principle', content: 'Let A={a,b,c,d}, B={1,2,3,4,5}. Find the number of one-one and onto functions from (i) A to B (ii) B to A.' },
  { moduleNumber: 3, topicName: 'Functions and the Pigeonhole Principle', content: 'If there are 60 one-to-one functions from A to B and |A|=3, find |B|.' },
  { moduleNumber: 3, topicName: 'Functions and the Pigeonhole Principle', content: 'Let A={1,...,7}, B={w,x,y,z}. Find the number of onto functions from A to B.' },
  { moduleNumber: 3, topicName: 'Functions and the Pigeonhole Principle', content: 'For f(x)=2x+5 and g(x)=(x-5)/2 from R to R, prove g is the inverse of f.' },
  { moduleNumber: 3, topicName: 'Functions and the Pigeonhole Principle', content: 'For f(x)=ax+b and g(x)=1-x+x^2, if (g o f)(x)=9x^2-9x+3, determine a and b.' },
  { moduleNumber: 3, topicName: 'Functions and the Pigeonhole Principle', content: 'For f(a)=2a+1 and g(b)=b/3 with A=B=C=R, compute g o f, show it is invertible, and find its inverse.' },
  { moduleNumber: 3, topicName: 'Functions and the Pigeonhole Principle', content: 'For the piecewise function f(x)=3x-5 if x>0, 1-3x if x<=0, find f(1), f(-1), f(5/3), f(-5/3), and the preimages of 0,1,-1,3,-3,-6, and the intervals [-5,5] and [-6,5].' },

  // ===== MODULE 4: Principle of Inclusion and Exclusion =====
  { moduleNumber: 4, topicName: 'Inclusion-Exclusion Principle', content: 'In how many ways can 5 as, 4 bs, and 3 cs be arranged so that all identical letters are not in a single block?' },
  { moduleNumber: 4, topicName: 'Inclusion-Exclusion Principle', content: 'Determine the number of positive integers n with 1<=n<=100 that are not divisible by 2, 3, or 5.' },
  { moduleNumber: 4, topicName: 'Inclusion-Exclusion Principle', content: 'In how many ways can the 26 letters of the alphabet be permuted so that none of the patterns CAR, DOG, PUN, or BYTE occurs?' },
  { moduleNumber: 4, topicName: 'Inclusion-Exclusion Principle', content: 'How many integers between 1 and 300 inclusive are divisible by (i) at least one of 5, 6, or 8 (ii) none of 5, 6, and 8?' },
  { moduleNumber: 4, topicName: 'Inclusion-Exclusion Principle', content: '10 men handover umbrellas to a receptionist. In how many ways can umbrellas be returned so that (i) no man receives his own umbrella (ii) at least one gets his own (iii) at least two get their own?' },
  { moduleNumber: 4, topicName: 'Inclusion-Exclusion Principle', content: 'In how many ways can the letters of CORRESPONDENTS be arranged so there are (i) no pair (ii) at least 2 pairs of consecutive identical letters?' },
  { moduleNumber: 4, topicName: 'Inclusion-Exclusion Principle', content: 'Determine the number of integers between 1 and 250 divisible by 3 and not divisible by 5 and 7.' },

  { moduleNumber: 4, topicName: 'Derangements', content: 'Define derangement. Find the number of derangements of 1, 2, 3, 4.' },
  { moduleNumber: 4, topicName: 'Derangements', content: 'Evaluate d5, d6, d7, d8 (derangement numbers).' },
  { moduleNumber: 4, topicName: 'Derangements', content: 'In how many ways can the numbers 1 through 10 be arranged in a line so that no even integer is in its natural place?' },
  { moduleNumber: 4, topicName: 'Derangements', content: 'Define derangement. Eight letters are to be placed in eight envelopes addressed to eight different people. Find the number of ways so that at least one letter reaches the right person.' },
  { moduleNumber: 4, topicName: 'Derangements', content: 'Define derangement. In how many ways can 10 people each select a left and right glove from 10 pairs so that no one selects a matching pair?' },

  { moduleNumber: 4, topicName: 'Rook Polynomials', content: 'Find the rook polynomial for a chessboard containing 4 forbidden squares in a given configuration.' },
  { moduleNumber: 4, topicName: 'Rook Polynomials', content: 'Find the rook polynomial for a 3x3 board using the expansion formula.' },
  { moduleNumber: 4, topicName: 'Rook Polynomials', content: 'Find the rook polynomial for a 2x2 board using the expansion formula.' },

  { moduleNumber: 4, topicName: 'Arrangements with Forbidden Positions', content: 'Four persons P1,P2,P3,P4 arrive late to a dinner party with one vacant chair at each of five tables T1-T5. P1 will not sit at T1 or T2. P2 will not sit at T2. P3 will not sit at T3 or T4. P4 will not sit at T4 or T5. Find the number of ways they can occupy the vacant chairs.' },
  { moduleNumber: 4, topicName: 'Arrangements with Forbidden Positions', content: 'An apple, banana, mango, and orange are distributed to four boys B1-B4. B1 and B2 do not want apple, B3 does not want banana or mango, B4 refuses orange. In how many ways can the distribution be made so no boy is displeased?' },
  { moduleNumber: 4, topicName: 'Arrangements with Forbidden Positions', content: 'Five teachers T1-T5 are assigned as class teachers for classes C1-C5, one each. T1,T2 do not want C1 or C2; T3,T4 do not want C4 or C5; T5 does not want C3, C4, or C5. In how many ways can the assignment be made?' },

  { moduleNumber: 4, topicName: 'Second-Order Linear Recurrence Relations', content: 'Solve the recurrence an - 6a(n-1) + 9a(n-2) = 0 for n>=2 with a0=5, a1=12.' },
  { moduleNumber: 4, topicName: 'Second-Order Linear Recurrence Relations', content: 'Solve the Fibonacci recurrence F(n+2) = F(n+1) + Fn for n>=0 with F0=0, F1=1.' },
  { moduleNumber: 4, topicName: 'Second-Order Linear Recurrence Relations', content: 'Solve the recurrence an = 5a(n-1) + 6a(n-2) for n>=2, a0=1, a1=3.' },
  { moduleNumber: 4, topicName: 'Second-Order Linear Recurrence Relations', content: 'Solve the recurrence a(n+2) - 3a(n+1) + 2an = 0, a0=1, a1=6.' },
  { moduleNumber: 4, topicName: 'Second-Order Linear Recurrence Relations', content: 'Solve the recurrence Cn = 3C(n-1) - 2C(n-2) for n>=2 given C1=5, C2=3.' },

  { moduleNumber: 4, topicName: 'First-Order Recurrence Relations', content: 'The number of virus-affected files in a system starts at 1000 and increases by 250% every 2 hours. Use a recurrence relation to determine the number of affected files after 12 hours.' },
  { moduleNumber: 4, topicName: 'First-Order Recurrence Relations', content: 'Solve the recurrence relation an = n * a(n-1) for n>=1, a0=1.' },
];