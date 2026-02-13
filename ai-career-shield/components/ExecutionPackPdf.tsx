'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ExecutionPack } from '@/types/executionPack';

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11,
    fontFamily: 'Helvetica',
    color: '#0f172a',
  },
  title: {
    fontSize: 20,
    marginBottom: 6,
    fontWeight: 700,
  },
  subtitle: {
    fontSize: 11,
    marginBottom: 16,
    color: '#334155',
  },
  sectionTitle: {
    fontSize: 14,
    marginTop: 14,
    marginBottom: 8,
    fontWeight: 700,
  },
  card: {
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  h3: {
    fontSize: 12,
    marginBottom: 6,
    fontWeight: 700,
  },
  p: {
    marginBottom: 6,
    lineHeight: 1.35,
  },
  label: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  pillRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 6,
  },
  pill: {
    border: '1px solid #e2e8f0',
    borderRadius: 999,
    paddingVertical: 2,
    paddingHorizontal: 8,
    fontSize: 9,
    color: '#0f172a',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  col: {
    flexGrow: 1,
    flexBasis: 0,
  },
  note: {
    color: '#334155',
    fontStyle: 'italic',
  },
});

function safeText(value: unknown) {
  if (value === null || value === undefined) return '';
  return String(value);
}

export function ExecutionPackPdfDocument({ data }: { data: ExecutionPack }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>AI Career Shield — Execution Pack</Text>
        <Text style={styles.subtitle}>
          Project briefs + skill gap map. Generated for: {safeText(data.skillGapMap?.roleTitle || 'your target role')}
        </Text>

        <Text style={styles.sectionTitle}>Portfolio Project Briefs</Text>
        {data.projectBriefs.map((brief) => (
          <View key={brief.id} style={styles.card}>
            <Text style={styles.h3}>{brief.title}</Text>
            <Text style={styles.p}>{brief.summary}</Text>

            <Text style={styles.label}>Difficulty / Time</Text>
            <Text style={styles.p}>
              {safeText(brief.difficulty)} • Est. {safeText(brief.estimatedTime)}
            </Text>

            <Text style={styles.label}>Key Deliverables</Text>
            <View style={styles.pillRow}>
              {brief.deliverables.map((d, i) => (
                <Text key={i} style={styles.pill}>
                  {d}
                </Text>
              ))}
            </View>

            <Text style={styles.label}>Implementation Steps</Text>
            {brief.steps.map((s) => (
              <View key={s.step} style={{ marginBottom: 6 }}>
                <Text style={{ fontWeight: 700 }}>
                  {s.step}. {s.title}
                </Text>
                {s.details.map((detail, i) => (
                  <Text key={i} style={styles.p}>
                    • {detail}
                  </Text>
                ))}
              </View>
            ))}

            <Text style={styles.label}>Portfolio Packaging</Text>
            <Text style={[styles.p, styles.note]}>
              “{brief.portfolioPackaging?.headline || ''}”
            </Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Personalized Skill Gap Map</Text>
        <View style={styles.card}>
          <Text style={styles.h3}>Target role: {safeText(data.skillGapMap.roleTitle)}</Text>

          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Matched Skills</Text>
              {data.skillGapMap.matchedSkills.map((s, i) => (
                <Text key={i} style={styles.p}>
                  • {s.skill} — {s.evidence}
                </Text>
              ))}
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Priority Skill Gaps</Text>
              {data.skillGapMap.gapSkills.map((s, i) => (
                <Text key={i} style={styles.p}>
                  • {s.skill}: {s.whyItMatters}
                </Text>
              ))}
            </View>
          </View>

          <Text style={[styles.label, { marginTop: 10 }]}>Recommended Sequence</Text>
          {data.skillGapMap.recommendedSequence.map((seq, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <Text style={{ fontWeight: 700 }}>{seq.weekRange}</Text>
              <Text style={styles.p}>Focus: {seq.focus.join(' & ')}</Text>
              {seq.outputs.map((out, oi) => (
                <Text key={oi} style={styles.p}>
                  • Output: {out}
                </Text>
              ))}
            </View>
          ))}

          {data.skillGapMap.notes?.length ? (
            <>
              <Text style={[styles.label, { marginTop: 10 }]}>Coach’s notes</Text>
              {data.skillGapMap.notes.map((n, i) => (
                <Text key={i} style={[styles.p, styles.note]}>
                  “{n}”
                </Text>
              ))}
            </>
          ) : null}
        </View>
      </Page>
    </Document>
  );
}
