'use client'

import { FiveVDiagram, FiveNotions, ThreeVTriangle, DivideReign, MapReducePipeline, MeanLength, VowelsDemo } from './concepts'
import { HdfsArchitecture, HdfsWrite, HdfsRead, WordCountDemo } from './hdfs'
import { ReplicaSetDiagram, ShardingArchitecture, StoragePyramid, HistoryTimeline } from './mongo'

const registry: Record<string, React.ComponentType> = {
  'five-v': FiveVDiagram,
  'five-notions': FiveNotions,
  'three-v-triangle': ThreeVTriangle,
  'divide-reign': DivideReign,
  'mapreduce-pipeline': MapReducePipeline,
  'mean-length': MeanLength,
  'vowels-demo': VowelsDemo,
  'hdfs-architecture': HdfsArchitecture,
  'hdfs-write': HdfsWrite,
  'hdfs-read': HdfsRead,
  'wordcount-demo': WordCountDemo,
  'replica-set': ReplicaSetDiagram,
  'sharding-architecture': ShardingArchitecture,
  'storage-pyramid': StoragePyramid,
  'history-timeline': HistoryTimeline,
}

export function Diagram({ name }: { name: string }) {
  const C = registry[name]
  if (!C) return null
  return <C />
}
