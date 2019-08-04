---
imports: |
    import AsyncComponent from '@components/async/AsyncComponent';
    let resolve = () => import('@components/galaxy/Galaxy');
id: 4
type: component
slug: space-doughnut
title: Space Doughnut
description: JavaScript Particles
---

<AsyncComponent resolve={resolve} />