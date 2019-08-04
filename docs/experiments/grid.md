---
imports: |
    import AsyncComponent from '@components/async/AsyncComponent';
    let resolve = () => import('@components/grid/Grid');
id: 2
type: component
slug: grid
title: Grid
description: Web Audio & Canvas Experiment
---

<AsyncComponent resolve={resolve} />