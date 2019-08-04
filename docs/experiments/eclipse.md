---
imports: |
    import AsyncComponent from '@components/async/AsyncComponent';
    let resolve = () => import('@components/eclipse/Eclipse');
id: 3
type: component
slug: eclipse
title: Eclipse
description: Web Audio & Canvas Experiment
---

<AsyncComponent resolve={resolve} />