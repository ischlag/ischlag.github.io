---
title: "Auditable LLM Training: Verifiable Proof-of-Learning for Apertus"
level: MSc
duration: 6 months
start: immediately
keywords: [LLM training, Proof-of-Learning, reproducibility, Megatron-LM, Apertus]
contact: [james.chiang@inf.ethz.ch, imanol.schlag@ai.ethz.ch]
published: true
---

When a lab releases an open model, nothing today lets outsiders check that the published weights actually came from the disclosed training data: the weights are uninspectable, and the link between data and model is an unverifiable promise. This thesis works toward an audit certificate for Apertus, Switzerland's open LLM: a hash-chained record of training that lets anyone re-execute and verify individual training steps on their own hardware. You will explore the question the whole design rests on: how much do two honest executions of the same training step diverge across different infrastructure (GPU vendors, cluster setups, parallelism layouts), and can a rounding scheme or a fuzzy hash absorb that noise to enable verification in this setting?

## Background and Motivation

The idea, known as Proof-of-Learning, is simple: during training, commit to hashes of the training state, the data consumed, and the resulting state at every step, chained so the record cannot be rewritten. Verification is re-execution of individual steps, which is embarrassingly parallel: the total cost of an audit is comparable to training, but it can be split across many verifiers and no single verifier needs large resources. The effect is to move the required trust away from the model builder and onto the training data, which is public and can be scrutinised by anyone, at any time. Combined with Apertus's fully open data pipeline, this would make Apertus the first frontier-scale model whose openness is verifiable rather than asserted.

The fundamental obstacle is numerical: identical training logic on different hardware does not produce bit-identical results, because floating-point addition is not associative and every GPU orders its sums differently (kernel tilings, tensor-core internals, allreduce topologies). Honest trainer and verifier states therefore differ in their lowest bits, while hashes can only be compared for equality. The candidate remedy is to round both states onto a shared grid before hashing, so honest noise is discarded by the projection while the verdict stays binary. Whether this works at scale is unknown: no published study characterises replay divergence for Megatron-scale training across GPU vendors, and nothing at all covers mixture-of-experts models, where a single flipped routing decision changes the computation macroscopically. This is the gap the thesis fills, jointly supervised by the ETH AI Center (training side) and the Applied Cryptography group (commitment side).

## Research Questions

- RQ1: How large is the divergence between honest replays of the same training segment across hardware (GH200 vs MI300A), parallelism layouts, model sizes, precisions, and optimisers, and does it grow with replayed steps or settle at a noise floor?
- RQ2: Given the measured noise, does a rounding grid exist that is coarse enough to absorb it over realistic checkpoint intervals yet fine enough to still pin down the model, and how must values near grid-cell boundaries be handled?
- RQ3 (stretch): What can an adversarial trainer hide within the accepted noise, and how do discrete decisions (mixture-of-experts routing, RNG) change the picture?

## Approach and Timeline

| Months | Work package |
|--------|--------------|
| 1      | Literature review (Proof-of-Learning and its attacks, verifiable training), environment setup on Alps, first single-node replay of a small dense model |
| 2-3    | Replay harness for Megatron-LM: bit-exact checkpoint restore, committed batches and RNG, segment re-execution; divergence measurements across hardware and configurations (RQ1) |
| 4-5    | Rounding and commitment experiments: grid sweeps, boundary handling, hash chain prototype over real training runs (RQ2); stretch: first adversarial analysis (RQ3) |
| 6      | Writing, final experiments, presentation |

## What We Offer

- A topic directly relevant to the Apertus project: your results feed into how Switzerland's open LLM will be trained and released.
- Interdisciplinary supervision by [James Chiang](https://jachiang.github.io/) (applied cryptography, ETH) and [Imanol Schlag](https://ischlag.github.io/) (ETH AI Center), with weekly or bi-weekly meetings; official supervisor: Prof. Srdjan Capkun (ETH Zurich).
- Interaction with the Apertus engineering team where needed.
- Compute and experiments on Alps, one of the largest supercomputers in Europe (GH200 nodes, plus AMD MI300A for cross-vendor measurements).
- A scoped, novel question where solid execution is likely to lead to a publication.

## Requirements

Must have:

- Strong Python and PyTorch experience.
- Completed coursework in deep learning.
- Grit and dedication: low-level numerical debugging in a large codebase is part of the job.
- Genuine interest in LLM development and cryptographic concepts.

A strong candidate also brings:

- Completed the Large-Scale AI Engineering (LSAIE) course, or similar experience.
- Experience with distributed training or HPC clusters (SLURM).
- Familiarity with Megatron-LM or similar large-scale codebases.
- Relevant cryptography courses and know-how.

## References

1. Jia et al. "Proof-of-Learning: Definitions and Practice." IEEE S&P, 2021.
2. Fang et al. "Proof-of-Learning is Currently More Broken Than You Think." EuroS&P, 2023.
3. Srivastava, Arora, Boneh. "Optimistic Verifiable Training by Controlling Hardware Nondeterminism." NeurIPS, 2024.
4. Arun et al. "Verde: Verification via Refereed Delegation for Machine Learning Programs." arXiv, 2025.
5. Choi et al. "Tools for Verifying Neural Models' Training Data." NeurIPS, 2023.
